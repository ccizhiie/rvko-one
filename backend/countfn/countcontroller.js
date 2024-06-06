const fs = require('fs');
const path = require('path');
const acorn = require('acorn');
const walk = require('acorn-walk');

function countFunctionsInFile(filePath) {
    try {
        const code = fs.readFileSync(filePath, 'utf-8');
        const ast = acorn.parse(code, { ecmaVersion: 'latest', sourceType: 'module' });
        let functionCount = 0;
 
        walk.simple(ast, {
            FunctionDeclaration() {
                functionCount++;
            },
            FunctionExpression() {
                functionCount++;
            },
            ArrowFunctionExpression() {
                functionCount++;
            },
            VariableDeclaration(node) {
                node.declarations.forEach((declaration) => {
                    if (declaration.init && (
                        declaration.init.type === 'FunctionExpression'||
                        declaration.init.type === 'ArrowFunctionExpression'
                    )) {
                        functionCount++;
                    }
                });
            }
        });

        return functionCount;
    } catch (err) {
        console.error(`Error reading file ${filePath}:`, err);
        return 0;
    }
}

function countFunctionsInDirectory(directoryPath) {
    let totalFunctions = 0;
    const fileFunctionCounts = {};

    function walkSync(currentPath) {
        try {
            const files = fs.readdirSync(currentPath);
            files.forEach((file) => {
                const filePath = path.join(currentPath, file);
                const stat = fs.statSync(filePath);

                if (stat.isDirectory()) {
                    walkSync(filePath);
                } else if (file.endsWith('.js')) {
                    const functionCount = countFunctionsInFile(filePath);
                    fileFunctionCounts[filePath] = functionCount;
                    totalFunctions += functionCount;
                }
            });
        } catch (err) {
            console.error(`Error reading directory ${currentPath}:`, err);
        }
    }

    walkSync(directoryPath);
    return { totalFunctions, fileFunctionCounts };
}

// Path to the project directory, relative to the current script file
const projectDirectory = path.join(__dirname, '../controllers');

const { totalFunctions, fileFunctionCounts } = countFunctionsInDirectory(projectDirectory);

console.log(`Total number of functions in the project: ${totalFunctions}`);
console.log('Number of functions in each file:');
for (const [filePath, count] of Object.entries(fileFunctionCounts)) {
    console.log(`${filePath}: ${count}`);
}
