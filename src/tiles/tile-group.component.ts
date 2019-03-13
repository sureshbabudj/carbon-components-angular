import {
	Component,
	AfterContentInit,
	Input,
	Output,
	EventEmitter,
	HostBinding,
	ContentChildren,
	QueryList
} from "@angular/core";
import { SelectionTile } from "./selection-tile.component";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
	selector: "ibm-tile-group",
	template: `<ng-content select="ibm-selection-tile"></ng-content>`,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: TileGroup,
			multi: true
		}
	]
})
export class TileGroup implements AfterContentInit {
	static tileGroupCount = 0;
	/**
	 * The tile group `name`
	 */
	@Input() name = `tile-group-${TileGroup.tileGroupCount}`;
	/**
	 * Set to `"multi"` to support multiple tile selection
	 */
	@Input() type: "single" | "multi" = "single";

	/**
	 * Emits an event when the tile selection changes.
	 *
	 * Emits an object that looks like:
	 * ```javascript
	 * {
	 * 	value: "something",
	 * 	selected: true,
	 * 	name: "tile-group-1"
	 * }
	 * ```
	 */
	@Output() selected: EventEmitter<{value: string, selected: boolean, name: string}> = new EventEmitter();

	@HostBinding("class.bx--tile-group") tileGroupClass = true;

	@ContentChildren(SelectionTile) selectionTiles: QueryList<SelectionTile>;

	constructor() {
		TileGroup.tileGroupCount++;
	}

	onChange = (_: any) => { };

	onTouched = () => { };

	ngAfterContentInit() {
		this.selectionTiles.forEach(tile => {
			tile.name = this.name;
			tile.change.subscribe(() => {
				this.selected.emit({
					value: tile.value,
					selected: tile.selected,
					name: this.name
				});
				this.onChange(tile.value);
			});
			tile.type = this.type;
		});
	}

	writeValue(value: any) {
		if (!this.selectionTiles) { return; }
		this.selectionTiles.forEach(tile => {
			if (tile.value === value) {
				tile.selected = true;
			} else {
				tile.selected = false;
			}
		});
	}

	registerOnChange(fn: any) {
		this.onChange = fn;
	}

	registerOnTouched(fn: any) {
		this.onTouched = fn;
	}
}
