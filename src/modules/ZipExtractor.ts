
export interface ZipContent {
    [filePath: string]: {
        content: string
    }
}

export class ZipExtractor {
    public extract(zipData: Blob): Promise<ZipContent> {
        console.info('reading zip blob', zipData);

        let zipContent: ZipContent = {};
        return new Promise<ZipContent>((resolve, reject) => {
            zip.createReader(new zip.BlobReader(zipData), (zipReader) => {
                let beginDate: Date = new Date();
                console.info(`zip reader opened at ${beginDate}`, zipData);

                zipReader.getEntries(async (zipEntries: zip.Entry[]) => {
                    console.info(`${zipEntries.length} entries read`, zipData);

                    try {
                        let i = 0;
                        for (let zipEntry of zipEntries) {
                            console.info(`#${++i} => ${zipEntry.filename}`);

                            // may be parallel rather than serial
                            let entryContent: string = await this.readEntryContent(zipEntry);
                            zipContent[zipEntry.filename] = {
                                content: entryContent
                            };
                        }

                        zipReader.close(() => {
                            let endDate: Date = new Date();
                            console.info(`zip read ended at ${endDate} - ${endDate.getTime() - beginDate.getTime()}ms`);
                            resolve(zipContent);
                        });

                    } catch (e) {
                        zipReader.close(() => {
                            reject(e);
                        });
                    }
                });
            }, reject);
        });
    }

    private readEntryContent(entry: zip.Entry): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            entry.getData(
                new zip.TextWriter('utf-8'),
                (resultText: string) => {
                    resolve(resultText);
                },
                (current: number, total: number) => {
                    console.debug(`${entry.filename}: ${current}/${total}B`);
                });
        });
    }

}
