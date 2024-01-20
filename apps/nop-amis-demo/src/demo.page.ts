export default {
	type: "page",
	data: {
		a: "A1",
		b: "B2",
		c: "C3",
		d: "D4"
	},
	body: {
		type: "form",
		debug: true,
		body: [
			{
				type: "input-text",
				name: "a",
				size: "sm"
			},
			{
				type: "popup-editor",
				size: "sm",
				name: "b2",
				popup: {
					type: "group",
					body: [
						{
							type: "input-text",
							name: "c"
						},
						{
							type: "input-text",
							name: "d"
						},
					]
				}
			}
		]
	}
}