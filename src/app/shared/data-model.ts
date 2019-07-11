export class Movie {
    Name: string;
    Image: string;
    Network: string;
    Summary: string;
    Status: string;

    constructor(serverModel: any) {
        this.Name = serverModel.name;
        this.Image = serverModel.image ? serverModel.image.medium : '';
        this.Network = serverModel.network ? serverModel.network.name : '';
        this.Summary = serverModel.summary;
        this.Status = serverModel.status;
    }
}