import {
	Component,
	HostBinding,
	Input,
	ViewChild,
	ElementRef,
	AfterContentInit
} from "@angular/core";
import { I18n } from "./../i18n/i18n.module";
import { BehaviorSubject } from "rxjs";

@Component({
	selector: "ibm-expandable-tile",
	template: `
		<div
			class="bx--tile bx--tile--expandable"
			[ngClass]="{'bx--tile--is-expanded' : expanded}"
			[ngStyle]="{'max-height': tileStyle + 'px'}"
			role="button"
			tabindex="0"
			(click)="onClick()">
			<button [attr.aria-label]="(expanded ? collapse : expand) | async" class="bx--tile__chevron">
				<svg *ngIf="!expanded" width="12" height="7" viewBox="0 0 12 7" role="img">
					<title>{{expand | async}}</title>
					<path fill-rule="nonzero" d="M6.002 5.55L11.27 0l.726.685L6.003 7 0 .685.726 0z"/>
				</svg>
				<svg *ngIf="expanded" width="12" height="7" viewBox="0 0 12 7" role="img">
					<title>{{collapse | async}}</title>
					<path fill-rule="nonzero" d="M6.002 5.55L11.27 0l.726.685L6.003 7 0 .685.726 0z"/>
				</svg>
			</button>
			<div class="bx--tile-content">
				<ng-content select="ibm-above-the-fold"></ng-content>
				<ng-content select="ibm-below-the-fold"></ng-content>
			</div>
		</div>
	`
})
export class ExpandableTile implements AfterContentInit {
	@Input() expanded = false;
	/**
	 * Expects an object that contains some or all of:
	 * ```
	 * {
	 *		"EXPAND": "Expand",
	 *		"COLLAPSE": "Collapse",
	 * }
	 * ```
	 */
	@Input()
	set translations (value) {
		if (value.EXPAND) {
			this.expand = new BehaviorSubject(value.EXPAND);
		}
		if (value.COLLAPSE) {
			this.collapse = new BehaviorSubject(value.COLLAPSE);
		}
	}

	tileMaxHeight = 0;
	element = this.elementRef.nativeElement;

	expand = this.i18n.get("TILES.EXPAND");
	collapse = this.i18n.get("TILES.COLLAPSE");

	constructor(protected i18n: I18n, protected elementRef: ElementRef) {}

	ngAfterContentInit() {
		this.setMaxHeight();
	}

	get tileStyle() {
		return this.tileMaxHeight + parseInt(getComputedStyle(this.element.querySelector(".bx--tile")).padding, 10);
	}

	setMaxHeight() {
		if (this.expanded) {
			this.tileMaxHeight = this.element.querySelector(".bx--tile-content").getBoundingClientRect().height;
		} else {
			this.tileMaxHeight = this.element.querySelector(".bx--tile-content__above-the-fold").getBoundingClientRect().height;
		}
	}

	onClick() {
		this.expanded = !this.expanded;
		this.setMaxHeight();
	}
}

@Component({
	selector: "ibm-above-the-fold",
	template: `
		<span class="bx--tile-content__above-the-fold">
			<ng-content></ng-content>
		</span>
	`
})
export class AboveTheFold { }

@Component({
	selector: "ibm-below-the-fold",
	template: `
		<span class="bx--tile-content__below-the-fold">
			<ng-content></ng-content>
		</span>
	`
})
export class BelowTheFold { }
