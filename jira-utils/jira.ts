let columns: HTMLElement[] = [];

const hiddenColumns: [index: number, previousValue: string][] = [];

export const hideColumns = (columnsToHide: string[]) => {
	columns = Array.from(
		document.querySelectorAll(
			"div[data-component-selector='platform-board-kit.ui.column.draggable-column']",
		),
	);

	if (columnsToHide) {
		columnsToHide = columnsToHide.map(each => each.toLowerCase());

		// columns[0].querySelector(
		// 	'div[data-testid="platform-board-kit.common.ui.column-header.editable-title.column-title.column-name"]',
		// ).textContent.toUpp === "Dev Complete";

		columns.forEach(column =>
			columnsToHide.includes(
				column
					.querySelector(
						'div[data-testid="platform-board-kit.common.ui.column-header.editable-title.column-title.column-name"]',
					)
					?.textContent?.toLowerCase(),
			),
		);
	} else {
		const columnItems = columns.map(column =>
			Array.from(
				// eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
				column.querySelector(
					"ul[data-testid='software-board.board-container.board.virtual-board.fast-virtual-list.fast-virtual-list-wrapper']",
				)?.children!,
			),
		);

		columnItems.forEach((items, i) => {
			const _column = columns[i];
			// data-testid="platform-board-kit.common.ui.column-header.editable-title.column-title.column-name"

			if (!items.some(item => item.ariaHidden !== "true")) {
				const column = columns[i];

				hiddenColumns.push([i, column.style.display]);
				column.style.display = "none";
			}
		});
	}
};

export const restoreColumns = () => {
	hiddenColumns.forEach(([i, prevValue]) => {
		columns[i].style.display = prevValue;
	});
};
