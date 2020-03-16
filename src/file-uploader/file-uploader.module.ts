import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
	CloseModule,
	CheckmarkFilledModule,
	WarningFilledModule
} from "@carbon/icons-angular";

import { FileUploader } from "./file-uploader.component";
import { FileComponent } from "./file.component";
import { ButtonModule } from "../button/button.module";
import { LoadingModule } from "../loading/loading.module";

// compatibility export
// TODO: remove in v4
// tslint:disable-next-line: variable-name
// export const File = FileComponent;

@NgModule({
	declarations: [FileUploader, FileComponent],
	exports: [FileUploader, FileComponent],
	imports: [
		CommonModule,
		ButtonModule,
		LoadingModule,
		CloseModule,
		CheckmarkFilledModule,
		WarningFilledModule
	]
})
export class FileUploaderModule { }
