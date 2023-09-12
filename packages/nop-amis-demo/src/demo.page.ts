export default  {
    type: "page",
    body: {
		type: "form",
		debug: true,
        body:[
			{
				type: "input-text",
				name: "a",
				size: "sm"
			},
			{
				type: "popup-editor",
				size: "sm",
				name : "b",
				popup: {
					type : "input-text",
					name: "c"
				}
			}
		]
    }
}