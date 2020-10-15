"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "merge",
      "objectHasKeys",
      "neq",
      "log",
      "writeJson",
      "blue",
      "loadAllPackages",
      "readJson",
      "objectKeyCount",
      "pluralize",
    ],
    [global, require("./StandardImport")],
    (
      merge,
      objectHasKeys,
      neq,
      log,
      writeJson,
      blue,
      loadAllPackages,
      readJson,
      objectKeyCount,
      pluralize
    ) => {
      let updateDependencyVersions,
        updateAllPackageDependencies,
        addSubPackagesToDependencies,
        updateSubPackages;
      updateDependencyVersions = function (packages, fromDeps, toDeps) {
        return toDeps != null && fromDeps != null
          ? Caf.object(fromDeps, (fromVersion, packageName) => {
              let toVersion, fileRefMatch;
              return (toVersion = toDeps[packageName]) &&
                fromVersion !== toVersion
                ? (fileRefMatch = toVersion.match(/^file:(.*)$/))
                  ? `^${Caf.toString(packages[fileRefMatch[1]].version)}`
                  : toVersion
                : fromVersion;
            })
          : undefined;
      };
      updateAllPackageDependencies = function (
        rootPackage,
        packages,
        dependencySetName = "dependencies",
        updatedMap = {},
        universalUpdates
      ) {
        let rootDeps;
        rootDeps = merge(rootPackage.dependencies, rootPackage.devDependencies);
        if (!objectHasKeys(rootDeps)) {
          return;
        }
        return Caf.each2(
          packages,
          (_package, packageRoot) => {
            let originalPackage, deps, newDeps, changed, file;
            originalPackage = _package;
            if (objectHasKeys((deps = _package[dependencySetName]))) {
              newDeps = updateDependencyVersions(packages, deps, rootDeps);
              changed = newDeps && neq(newDeps, deps);
              if (changed) {
                _package = packages[packageRoot] = merge(_package, {
                  [dependencySetName]: newDeps,
                });
              }
            }
            if (universalUpdates) {
              _package = merge(_package, universalUpdates);
            }
            return neq(originalPackage, _package)
              ? ((updatedMap[packageRoot] = true),
                (file = packageRoot + "/package.json"),
                log({ update: file }),
                writeJson(file, merge(_package, universalUpdates)))
              : undefined;
          },
          null,
          updatedMap
        );
      };
      addSubPackagesToDependencies = function (packages, dependencies) {
        return Caf.object(
          packages,
          ({ name }, packageFolder) => `file:${Caf.toString(packageFolder)}`,
          null,
          dependencies,
          ({ name }, packageFolder) => name
        );
      };
      return (updateSubPackages = function ({ quiet }) {
        !quiet && log(blue("Updating ./package.json >> **/package.json..."));
        return loadAllPackages().then((packages) => {
          let rootPackage,
            updatedMap,
            author,
            bugs,
            homepage,
            license,
            repository,
            updateCount,
            temp;
          rootPackage = readJson("package.json");
          addSubPackagesToDependencies(
            packages,
            (temp = rootPackage.dependencies) != null
              ? temp
              : (rootPackage.dependencies = {})
          );
          updatedMap = updateAllPackageDependencies(rootPackage, packages);
          updateAllPackageDependencies(
            rootPackage,
            packages,
            "devDependencies",
            updatedMap,
            (({ author, bugs, homepage, license, repository } = rootPackage),
            { author, bugs, homepage, license, repository })
          );
          if (0 < (updateCount = objectKeyCount(updatedMap))) {
            log(`Updated ${Caf.toString(pluralize("package", updateCount))}`);
          } else {
            log("Everything up to date.");
          }
          return null;
        });
      });
    }
  );
});
