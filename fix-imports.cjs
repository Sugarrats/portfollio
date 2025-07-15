const fs = require("fs");
const path = require("path");

// Dossier à scanner
const ROOT_DIR = path.resolve(__dirname, "src"); // adapte si besoin

/**
 * Corrige la casse d'un chemin vers un fichier réel
 */
function fixCaseSensitivePath(importPath, fileDir) {
  const absolutePath = path.resolve(fileDir, importPath);

  try {
    const dir = path.dirname(absolutePath);
    const base = path.basename(absolutePath);

    const realFiles = fs.readdirSync(dir);
    const realName = realFiles.find(
      (name) => name.toLowerCase() === base.toLowerCase()
    );

    if (realName && realName !== base) {
      const correctedPath = path.join(path.dirname(importPath), realName);
      return correctedPath.replace(/\\/g, "/");
    }
  } catch (e) {
    // Ignore if the file doesn't exist
  }

  return null;
}

/**
 * Scanne les fichiers .js/.jsx et corrige les imports
 */
function scanAndFix(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  entries.forEach((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      scanAndFix(fullPath);
    } else if (/\.(js|jsx|ts|tsx)$/.test(entry.name)) {
      let content = fs.readFileSync(fullPath, "utf8");
      let changed = false;

      content = content.replace(
        /(import\s+.*?from\s+['"]|require\s*\(\s*['"])(.+?)(['"]\)?)/g,
        (match, start, importPath, end) => {
          if (
            importPath.startsWith(".") &&
            !importPath.endsWith(".css") &&
            !importPath.endsWith(".json")
          ) {
            const fixedPath = fixCaseSensitivePath(importPath, path.dirname(fullPath));
            if (fixedPath) {
              changed = true;
              console.log(`✔ Corrigé : ${importPath} → ${fixedPath}`);
              return start + fixedPath + end;
            }
          }
          return match;
        }
      );

      if (changed) {
        fs.writeFileSync(fullPath, content, "utf8");
      }
    }
  });
}

console.log("🔍 Correction des imports sensibles à la casse...");
scanAndFix(ROOT_DIR);
console.log("✅ Terminé.");
