import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface BenchmarkResult {
  avg_witness_ms: number;
  avg_prove_ms: number;
  avg_verify_ms: number;
  avg_proof_size_bytes: number;
  fusion: boolean;
  threading: string;
  circuit: string;
  parameters: string;
  machine: string;
  platform: string;
  git_branch: string;
  trace_files: string[];
  run_timestamp: string;
}

interface ProcessedBenchmark {
  circuit: string;
  parameters: string;
  configs: Array<{
    prover: string;
    aws_instance: string;
    architecture: string;
    witness_ms: string;
    prove_ms: string;
    verify_ms: string;
    proof_size_kb: string;
    traces: Array<{
      url: string;
      label: string;
    }>;
  }>;
}

const API_URL = 'https://benchmark.binius.xyz/binius64-results.json';

const formatMs = (ms: number): string => ms.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const formatKB = (bytes: number): string => (bytes / 1024).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// Convert machine names to AWS instance format
const formatMachine = (machine: string): string => {
  const mapping: Record<string, string> = {
    'c7i-16xlarge': 'C7i.16xlarge',
    'c8g-16xlarge': 'C8g.16xlarge',
    'g6-2xlarge': 'G6.2xlarge'
  };
  return mapping[machine] || machine;
};

// Convert platform to architecture format
const formatArchitecture = (platform: string, threading: string): string => {
  const archMap: Record<string, string> = {
    'linux-x86_64': 'x86',
    'linux-aarch64': 'aarch64'
  };
  const arch = archMap[platform] || platform;
  const threadSuffix = threading === 'multi' ? '-mt' : '-st';
  return arch + threadSuffix;
};

// Create Perfetto trace URLs
const createTraceUrls = (gitBranch: string, traceFiles: string[]): Array<{url: string; label: string}> => {
  const branchFormatted = gitBranch.replace('/', '-');
  
  return traceFiles.map((traceFile, index) => {
    const baseUrl = 'https://perfetto.irreducible.com/traces/binius64/branch-' + branchFormatted + '/' + traceFile;
    const encodedUrl = encodeURIComponent(baseUrl);
    const perfettoUrl = `https://perfetto.irreducible.com/#!/?url=${encodedUrl}`;
    
    return {
      url: perfettoUrl,
      label: (index + 1).toString()
    };
  });
};

const LiveBenchmarkTable: React.FC = () => {
  const [benchmarks, setBenchmarks] = useState<ProcessedBenchmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get<BenchmarkResult[]>(API_URL);
        
        // Group by circuit and parameters
        const grouped = data.reduce((acc, result) => {
          const key = `${result.circuit}-${result.parameters}`;
          
          if (!acc[key]) {
            acc[key] = {
              circuit: result.circuit,
              parameters: result.parameters,
              configs: []
            };
          }
          
          acc[key].configs.push({
            prover: 'Binius64',
            aws_instance: formatMachine(result.machine),
            architecture: formatArchitecture(result.platform, result.threading) + (result.fusion ? '-fusion' : ''),
            witness_ms: formatMs(result.avg_witness_ms),
            prove_ms: formatMs(result.avg_prove_ms),
            verify_ms: formatMs(result.avg_verify_ms),
            proof_size_kb: formatKB(result.avg_proof_size_bytes),
            traces: createTraceUrls(result.git_branch, result.trace_files)
          });
          
          return acc;
        }, {} as Record<string, ProcessedBenchmark>);
        
        setBenchmarks(Object.values(grouped));
        
        // Find the most recent timestamp
        const timestamps = data.map(result => new Date(result.run_timestamp));
        const mostRecentTimestamp = new Date(Math.max(...timestamps.map(d => d.getTime())));
        setLastUpdated(mostRecentTimestamp.toLocaleString());
        
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-4 text-center">
        <p className="text-slate-600">Loading benchmark data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-800">Error loading benchmarks: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {lastUpdated && (
        <p className="text-sm text-gray-600 mb-6">
          Last updated: {lastUpdated}
        </p>
      )}
      {benchmarks.map((benchmark, index) => (
        <div key={index} className="mb-8">
          <h3 className="text-xl font-bold mb-2">{benchmark.circuit}</h3>
          <p className="text-sm mb-4">Parameters: {benchmark.parameters}</p>
          
          <table className="vocs_Table">
            <thead>
              <tr className="vocs_TableRow">
                <th className="vocs_TableHeader">Prover</th>
                <th className="vocs_TableHeader">AWS Instance</th>
                <th className="vocs_TableHeader">Architecture</th>
                <th className="vocs_TableHeader">Witness generation [ms]</th>
                <th className="vocs_TableHeader">Proof generation [ms]</th>
                <th className="vocs_TableHeader">Proof verification [ms]</th>
                <th className="vocs_TableHeader">Proof size [KiB]</th>
                <th className="vocs_TableHeader">Traces</th>
              </tr>
            </thead>
            <tbody>
              {benchmark.configs.map((config, configIndex) => (
                <tr key={configIndex} className="vocs_TableRow">
                  <td className="vocs_TableCell">{config.prover}</td>
                  <td className="vocs_TableCell">{config.aws_instance}</td>
                  <td className="vocs_TableCell">{config.architecture}</td>
                  <td className="vocs_TableCell">{config.witness_ms}</td>
                  <td className="vocs_TableCell">{config.prove_ms}</td>
                  <td className="vocs_TableCell">{config.verify_ms}</td>
                  <td className="vocs_TableCell">{config.proof_size_kb}</td>
                  <td className="vocs_TableCell">
                    {config.traces.map((trace, traceIndex) => (
                      <span key={traceIndex}>
                        <a 
                          href={trace.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {trace.label}
                        </a>
                        {traceIndex < config.traces.length - 1 ? ' ' : ''}
                      </span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default LiveBenchmarkTable;