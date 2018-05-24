export class SongClass {
private title: string;
private band: string;
private type: string;
private url: string;

constructor(title: string, band: string, type: string, url: string) {
    this.title = title;
    this.band = band;
    this.type = type;
    this.url = url;
}

getTitle(): string {
    return this.title;
}
getBand(): string {
    return this.band;
}
getType(): string {
    return this.type;
}
getUrl(): string {
    return this.url;
}


setTitle(title: string) {
    this.title = title;
}
setBand(band: string) {
    this.band = band;
}
setType(type: string) {
    this.type = type;
}
setUrl(url: string) {
    this.url = url;
}

}
