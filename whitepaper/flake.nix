{
  description = "The Binius64 protocol specification whitepaper";

  inputs = {
    nixpkgs.url = "https://channels.nixos.org/nixos-26.05/nixexprs.tar.zst";
  };

  outputs = inputs: {
    packages = builtins.mapAttrs (system: pkgs: {
      whitepaper = pkgs.stdenvNoCC.mkDerivation {
        name = "binius64-whitepaper";

        src = pkgs.lib.fileset.toSource {
          root = ./.;
          fileset = pkgs.lib.fileset.unions [
            ./Makefile
            ./main.tex
            ./bibliography.bib
          ];
        };

        # No buildPhase override: stdenv's default buildPhase runs `make` (the
        # `all` target) since a Makefile is present, and that invokes pdflatex/biber.
        nativeBuildInputs = [
          (pkgs.texliveSmall.withPackages (ps: [
            ps.biber
            ps.biblatex
            ps.mdframed
            ps.zref
            ps.needspace
            ps.mathtools
          ]))
        ];

        # biber writes a cache under $HOME.
        preBuild = "export HOME=$TMPDIR";

        installPhase = ''
          mkdir -p $out
          cp main.pdf $out/
        '';
      };

      default = inputs.self.packages.${system}.whitepaper;
    }) inputs.nixpkgs.legacyPackages;
  };
}
