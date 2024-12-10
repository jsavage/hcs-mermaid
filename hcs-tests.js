const testCases = [
    {
        input: `person microwave: open close start stop / beep
microwave [ magnetron ]
magnetron food: heat`,
        expectedEntities: ['person', 'microwave', 'magnetron', 'food'],
        expectedActions: [
            ['person', 'microwave', 'open'],
            ['person', 'microwave', 'close'],
            ['person', 'microwave', 'start'],
            ['person', 'microwave', 'stop'],
            ['magnetron', 'food', 'heat']
        ],
        expectedFeedback: [
            ['microwave', 'person', 'beep']
        ],
        expectedNested: {
            'microwave': ['magnetron']
        }
    }
    // Add more test cases as needed
];

function runTests() {
    let passed = 0;
    let failed = 0;

    testCases.forEach((testCase, index) => {
        try {
            const result = HCSParser.parse(testCase.input);
            
            const entitiesMatch = JSON.stringify(result.entities.sort()) === 
                                JSON.stringify(testCase.expectedEntities.sort());
            const actionsMatch = JSON.stringify(result.actions.sort()) === 
                               JSON.stringify(testCase.expectedActions.sort());
            const feedbackMatch = JSON.stringify(result.feedback.sort()) === 
                                JSON.stringify(testCase.expectedFeedback.sort());
            const nestedMatch = JSON.stringify(result.nestedEntities) === 
                              JSON.stringify(testCase.expectedNested);

            if (entitiesMatch && actionsMatch && feedbackMatch && nestedMatch) {
                console.log(`✓ Test Case ${index + 1} Passed`);
                passed++;
            } else {
                console.log(`✗ Test Case ${index + 1} Failed`);
                failed++;
            }
        } catch (error) {
            console.log(`✗ Test Case ${index + 1} Failed with error:`, error);
            failed++;
        }
    });

    console.log(`\nTest Summary: ${passed} passed, ${failed} failed`);
}

// Run tests when page loads
window.addEventListener('load', runTests);
