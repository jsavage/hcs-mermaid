global.mermaid = {
    initialize: jest.fn(),
    render: jest.fn().mockResolvedValue({ svg: '<svg></svg>' })
};
