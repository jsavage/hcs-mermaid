class HCSVisualizer {
    static generateMermaidCode(parsedData) {
        let code = 'graph TD\n';
        
        // Add subgraphs for nested entities
        Object.entries(parsedData.nestedEntities).forEach(([parent, children]) => {
            code += `    subgraph ${parent}\n`;
            children.forEach(child => {
                code += `        ${child}\n`;
            });
            code += '    end\n';
        });

        // Add action relationships
        parsedData.actions.forEach(([from, to, label]) => {
            code += `    ${from} -->|${label}| ${to}\n`;
        });

        // Add feedback relationships with different style
        parsedData.feedback.forEach(([from, to, label]) => {
            code += `    ${from} -.->|${label}| ${to}\n`;
        });

        return code;
    }
    // Update generateMermaidCode method
static generateMermaidCode(parsedData) {
    let code = 'graph TD;\n';  // Add semicolon after TD
    
    // Add subgraphs for nested entities
    Object.entries(parsedData.nestedEntities).forEach(([parent, children]) => {
        code += `    subgraph ${parent};\n`;  // Add semicolon
        children.forEach(child => {
            code += `        ${child};\n`;    // Add semicolon
        });
        code += '    end;\n';                 // Add semicolon
    });

    // Add action relationships
    parsedData.actions.forEach(([from, to, label]) => {
        code += `    ${from}-->|${label}|${to};\n`;  // Remove spaces around arrow, add semicolon
    });

    // Add feedback relationships
    parsedData.feedback.forEach(([from, to, label]) => {
        code += `    ${from}-.->|${label}|${to};\n`;  // Remove spaces around arrow, add semicolon
    });

    console.log('Mermaid code:', code);  // Debug output
    return code;
}
    static drawHCS(parsedData) {
        const diagram = document.getElementById('hcs-diagram');
        const code = this.generateMermaidCode(parsedData);
        
        // Add debug logging
        console.group('Mermaid Debug');
        console.log('Generated code:', code);
        console.log('Parsed data:', parsedData);
        console.groupEnd();

        try {
            mermaid.render('graphDiv', code).then(result => {
                diagram.innerHTML = result.svg;
            }).catch(err => {
                console.error('Mermaid render error:', err);
            });
        } catch (error) {
            console.error('Mermaid processing error:', error);
        }
    }


    static xdrawHCS(parsedData) {
        const diagram = document.getElementById('hcs-diagram');
        const code = this.generateMermaidCode(parsedData);
        console.log('Generated Mermaid code:', code); // Debug output
        
        // Clear and reinitialize mermaid
        mermaid.initialize({
            startOnLoad: true,
            theme: 'default',
            securityLevel: 'loose',
            flowchart: {
                useMaxWidth: false,
                htmlLabels: true,
                curve: 'basis'
            }
        });

        try {
            mermaid.render('graphDiv', code).then(result => {
                diagram.innerHTML = result.svg;
            }).catch(error => {
                console.error('Mermaid render error:', error);
            });
        } catch (error) {
            console.error('Mermaid processing error:', error);
        }
    }
}

// Function to handle visualization
function parseAndVisualize() {
    try {
        const input = document.getElementById('hcs-input').value;
        console.log('Parsing input:', input); // Debug output
        
        const parsed = HCSParser.parse(input);
        console.log('Parsed data:', parsed); // Debug output
        
        HCSVisualizer.drawHCS(parsed);
    } catch (error) {
        console.error('Error:', error);
        alert('Error parsing HCS: ' + error.message);
    }
}
