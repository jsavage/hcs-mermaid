class HCSParser {
    static parse(input) {
        const lines = input.trim().split('\n');
        const entities = new Set();
        const actions = [];
        const feedback = [];
        const nestedEntities = {};

        lines.forEach(line => {
            line = line.trim();
            if (line.includes(':')) {
                // Parse relationships
                const [entityPart, relationPart] = line.split(':');
                const [from, to] = entityPart.trim().split(/\s+/);
                entities.add(from);
                entities.add(to);

                if (relationPart.includes('/')) {
                    // Has both actions and feedback
                    const [actionPart, feedbackPart] = relationPart.split('/');
                    actionPart.trim().split(/\s+/).forEach(action => {
                        actions.push([from, to, action]);
                    });
                    feedbackPart.trim().split(/\s+/).forEach(feed => {
                        feedback.push([to, from, feed]);
                    });
                } else {
                    // Only actions
                    relationPart.trim().split(/\s+/).forEach(action => {
                        actions.push([from, to, action]);
                    });
                }
            } else if (line.includes('[')) {
                // Parse nested entities
                const match = line.match(/(\w+)\s*\[([\w\s]+)\]/);
                if (match) {
                    const [_, parent, children] = match;
                    const childList = children.trim().split(/\s+/);
                    nestedEntities[parent] = childList;
                    entities.add(parent);
                    childList.forEach(child => entities.add(child));
                }
            }
        });

        return {
            entities: Array.from(entities),
            actions,
            feedback,
            nestedEntities
        };
    }
}
