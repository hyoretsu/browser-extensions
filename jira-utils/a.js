let columns = [];

const hiddenColumns = [];

const _hideColumns = () => {
	columns = Array.from(
		document.querySelectorAll(
			"div[data-component-selector='platform-board-kit.ui.column.draggable-column']",
		),
	);

	const columnItems = Array.from(columns).map(column =>
		Array.from(
			// eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
			column.querySelector(
				"ul[data-testid='software-board.board-container.board.virtual-board.fast-virtual-list.fast-virtual-list-wrapper']",
			)?.children!,
		),
	);

	columnItems.forEach((items, i) => {
		if (items.some(item => item.ariaHidden !== "true")) {
			const column = columns[i];

			hiddenColumns.push([i, column.style.display]);
			column.style.display = "none";
		}
	});
};

const _restoreColumns = () => {
	hiddenColumns.forEach(([i, prevValue]) => {
		columns[i].style.display = prevValue;
	});
};
