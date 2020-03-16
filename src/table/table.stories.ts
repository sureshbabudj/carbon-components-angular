import { PaginationModule } from "./../pagination/pagination.module";
import { storiesOf, moduleMetadata } from "@storybook/angular";
import {
	withKnobs,
	boolean,
	select,
	number,
	text
} from "@storybook/addon-knobs/angular";

import {
	Table,
	TableModule,
	TableModel,
	TableItem,
	TableHeaderItem,
	NFormsModule,
	DialogModule,
	SearchModule,
	ButtonModule,
	DocumentationModule
} from "../";

import {
	SettingsModule,
	DeleteModule,
	SaveModule,
	DownloadModule,
	AddModule
} from "@carbon/icons-angular";

import {
	TableStory,
	DynamicTableStory,
	ExpansionTableStory,
	OverflowTableStory,
	PaginationTableStory,
	SkeletonTableStory,
	TableNoDataStory
} from "./stories";

const simpleModel = new TableModel();
simpleModel.data = [
	[new TableItem({data: "Name 1"}), new TableItem({data: "qwer"})],
	[new TableItem({data: "Name 3"}), new TableItem({data: "zwer"})],
	[new TableItem({data: "Name 2"}), new TableItem({data: "swer"})],
	[new TableItem({data: "Name 4"}), new TableItem({data: "twer"})]
];
simpleModel.header = [
	new TableHeaderItem({data: "Name"}), new TableHeaderItem({data: "hwer" })
];

const emptyModel = new TableModel();
emptyModel.header = [
	new TableHeaderItem({data: "Name"}), new TableHeaderItem({data: "hwer", style: {"width": "auto"} })
];

const getProps = (more = {}) => {
	return Object.assign({}, {
		model: simpleModel,
		size: select("size", { Small: "sm", Short: "sh", Normal: "md", Large: "lg" }, "md"),
		title: text("Title", "Table title"),
		description: text("Description", ""),
		showSelectionColumn: boolean("showSelectionColumn", true),
		striped: boolean("striped", false),
		sortable: boolean("sortable", true),
		isDataGrid: boolean("Data grid keyboard interactions", true),
		stickyHeader: boolean("stickyHeader", false),
		skeleton: boolean("skeleton", false)
	}, more);
};

storiesOf("Components|Table", module).addDecorator(
		moduleMetadata({
			imports: [
				NFormsModule,
				TableModule,
				DialogModule,
				PaginationModule,
				SearchModule,
				ButtonModule,
				SettingsModule,
				DeleteModule,
				SaveModule,
				DownloadModule,
				AddModule,
				DocumentationModule
			],
			declarations: [
				TableStory,
				DynamicTableStory,
				ExpansionTableStory,
				OverflowTableStory,
				PaginationTableStory,
				SkeletonTableStory,
				TableNoDataStory
			]
		})
	)
	.addDecorator(withKnobs)
	.add("Basic", () => ({
		template: `
		<ibm-table-container>
			<ibm-table-header>
				<h4 ibmTableHeaderTitle>{{title}}</h4>
				<p ibmTableHeaderDescription>{{description}}</p>
			</ibm-table-header>
			<app-table
				[model]="model"
				[stickyHeader]="stickyHeader"
				[size]="size"
				[skeleton]="skeleton"
				[showSelectionColumn]="showSelectionColumn"
				[striped]="striped"
				[sortable]="sortable"
				[isDataGrid]="isDataGrid">
			</app-table>
		</ibm-table-container>
	`,
		props: getProps()
	}))
	.add("With no data", () => ({
		template: `
		<ibm-table-container>
			<ibm-table-header>
				<h4 ibmTableHeaderTitle>{{title}}</h4>
				<p ibmTableHeaderDescription>{{description}}</p>
			</ibm-table-header>
			<app-no-data-table
				[model]="model"
				[size]="size"
				[skeleton]="skeleton"
				[showSelectionColumn]="showSelectionColumn"
				[striped]="striped">
				<tbody><tr><td class="no-data" colspan="3"><div>No data.</div></td></tr></tbody>
			</app-no-data-table>
		</ibm-table-container>
		`,
		styles: [`
			.no-data {
				width: 100%;
				height: 150px;
				text-align: center;
			}
		`],
		props: getProps({
			model: emptyModel,
			description: text("Description", "With no data")
		})
	}))
	.add("With toolbar", () => ({
		template: `
		<ibm-table-container>
			<ibm-table-header>
				<h4 ibmTableHeaderTitle>{{title}}</h4>
				<p ibmTableHeaderDescription>{{description}}</p>
			</ibm-table-header>
			<ibm-table-toolbar [model]="model" [batchText]="batchText">
				<ibm-table-toolbar-actions>
					<button ibmButton="primary">
						Delete
						<ibm-icon-delete size="16" class="bx--btn__icon"></ibm-icon-delete>
					</button>
					<button ibmButton="primary">
						Save
						<ibm-icon-save size="16" class="bx--btn__icon"></ibm-icon-save>
					</button>
					<button ibmButton="primary">
						Download
						<ibm-icon-download size="16" class="bx--btn__icon"></ibm-icon-download>
					</button>
				</ibm-table-toolbar-actions>
				<ibm-table-toolbar-content>
					<ibm-table-toolbar-search [expandable]="true"></ibm-table-toolbar-search>
					<button ibmButton="ghost" class="toolbar-action">
						<ibm-icon-settings size="16" class="bx--toolbar-action__icon"></ibm-icon-settings>
					</button>
					<button ibmButton="primary" size="sm">
						Primary Button
						<ibm-icon-add size="20" class="bx--btn__icon"></ibm-icon-add>
					</button>
				</ibm-table-toolbar-content>
			</ibm-table-toolbar>

			<app-table
				[model]="model"
				[size]="size"
				[showSelectionColumn]="showSelectionColumn"
				[striped]="striped"
				[sortable]="sortable"
				[skeleton]="skeleton"
				[stickyHeader]="stickyHeader"
				[isDataGrid]="isDataGrid">
			</app-table>
		</ibm-table-container>
	`,
		props: getProps({
			description: text("Description", "With toolbar"),
			batchText: text("Toolbar batch text", "items selected")
		})
	}))
	.add("With toolbar without toolbar action", () => ({
		template: `
		<ibm-table-container>
			<ibm-table-header>
				<h4 ibmTableHeaderTitle>{{title}}</h4>
				<p ibmTableHeaderDescription>{{description}}</p>
			</ibm-table-header>
			<ibm-table-toolbar>
				<ibm-table-toolbar-content>
					<ibm-table-toolbar-search [expandable]="true"></ibm-table-toolbar-search>
					<button ibmButton="toolbar-action">
						<ibm-icon-settings size="16" class="bx--toolbar-action__icon"></ibm-icon-settings>
					</button>
					<button ibmButton="primary" size="sm">
						Primary Button
						<ibm-icon-add size="20" class="bx--btn__icon"></ibm-icon-add>
					</button>
				</ibm-table-toolbar-content>
			</ibm-table-toolbar>

			<app-table
				[model]="model"
				[size]="size"
				[showSelectionColumn]="showSelectionColumn"
				[stickyHeader]="stickyHeader"
				[skeleton]="skeleton"
				[striped]="striped"
				[sortable]="sortable"
				[isDataGrid]="isDataGrid">
			</app-table>
		</ibm-table-container>
	`,
		props: getProps({
			description: text("Description", "With toolbar")
		})
	}))
	.add("With expansion", () => ({
		template: `
		<ibm-table-container>
			<ibm-table-header>
				<h4 ibmTableHeaderTitle>{{title}}</h4>
				<p ibmTableHeaderDescription>{{description}}</p>
			</ibm-table-header>
			<app-expansion-table
				[size]="size"
				[showSelectionColumn]="showSelectionColumn"
				[sortable]="sortable"
				[stickyHeader]="stickyHeader"
				[skeleton]="skeleton"
				[striped]="striped"
				[isDataGrid]="isDataGrid">
			</app-expansion-table>
		</ibm-table-container>
		`,
		props: getProps({
			description: text("Description", "With expansion")
		})
	}))
	.add("With dynamic content", () => ({
		template: `
		<ibm-table-container>
			<ibm-table-header>
				<h4 ibmTableHeaderTitle>{{title}}</h4>
				<p ibmTableHeaderDescription>{{description}}</p>
			</ibm-table-header>
			<app-custom-table
				[size]="size"
				[showSelectionColumn]="showSelectionColumn"
				[sortable]="sortable"
				[stickyHeader]="stickyHeader"
				[skeleton]="skeleton"
				[striped]="striped"
				[isDataGrid]="isDataGrid">
			</app-custom-table>
		</ibm-table-container>
		`,
		props: getProps({
			description: text("Description", "With dynamic content")
		})
	}))
	.add("With overflow menu", () => ({
		template: `
		<ibm-table-container>
			<ibm-table-header>
				<h4 ibmTableHeaderTitle>{{title}}</h4>
				<p ibmTableHeaderDescription>{{description}}</p>
			</ibm-table-header>
			<app-overflow-table
				[size]="size"
				[showSelectionColumn]="showSelectionColumn"
				[sortable]="sortable"
				[stickyHeader]="stickyHeader"
				[skeleton]="skeleton"
				[striped]="striped"
				[isDataGrid]="isDataGrid">
			</app-overflow-table>
		</ibm-table-container>
		`,
		props: getProps({
			description: text("Description", "With overflow menu")
		})
	}))
	.add("With pagination", () => ({
		template: `
		<ibm-table-container>
			<ibm-table-header>
				<h4 ibmTableHeaderTitle>{{title}}</h4>
				<p ibmTableHeaderDescription>{{description}}</p>
			</ibm-table-header>
			<app-pagination-table
				[skeleton]="skeleton"
				[sortable]="sortable"
				[totalDataLength]="totalDataLength"
				[showSelectionColumn]="showSelectionColumn"
				[stickyHeader]="stickyHeader"
				[skeleton]="skeleton"
				[model]="model">
			</app-pagination-table>
		</ibm-table-container>
		`,
		props: getProps({
			totalDataLength: number("totalDataLength", 105),
			description: text("Description", "With pagination")
		})
	}))
	.add("From components", () => ({
		template: `
			<table ibmTable [sortable]="false" style="width: 650px;">
				<thead ibmTableHead>
					<tr>
						<th
							ibmTableHeadCell
							*ngFor="let column of model.header"
							[column]="column">
						</th>
					</tr>
				</thead>
				<tbody ibmTableBody>
					<tr
						*ngFor="let row of model.data"
						ibmTableRow
						[row]="row">
						<td
							*ngFor="let item of row; let j = index"
							ibmTableData
							[item]="item"
							[class]="model.header[j].className"
							[ngStyle]="model.header[j].style">
						</td>
					</tr>
				</tbody>
			</table>
		`,
		props: getProps()
	}))
	.add("Skeleton", () => ({
		template: `
			<app-skeleton-table
				[skeletonModel]="skeletonModel"
				[size]="size"
				[striped]="striped">
			</app-skeleton-table>
	`,
		props: getProps()
	}))
	.add("Documentation", () => ({
		template: `
			<ibm-documentation src="documentation/components/Table.html"></ibm-documentation>
		`
	}));
