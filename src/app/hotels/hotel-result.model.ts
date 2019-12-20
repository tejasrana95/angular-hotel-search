export class CategoryModel {
    id: string;
    title: string;
    constructor(data) {
        this.id = data.id || '';
        this.title = data.title || '';
    }
}

export class AlternativeNamesModel {
    name: string;
    language: string;
    constructor(data) {
        this.name = data.name || '';
        this.language = data.language || '';
    }
}

export class OpeningHoursModel {
    text: string;
    label: string;
    isOpen: boolean;

    constructor(data) {
        this.text = data.text || '';
        this.label = data.label || '';
        this.isOpen = data.isOpen || false;
    }
}

export class HoteResultModel {
    id: string;
    position: any[];
    distance: number;
    title: string;
    averageRating: number;
    category: CategoryModel;
    icon: string;
    vicinity: string;
    alternativeNames: AlternativeNamesModel[];
    openingHours: OpeningHoursModel;
    constructor(data) {
        this.id = data.id || '';
        this.position = data.position || [];
        this.distance = data.distance || 0;
        this.title = data.title || '';
        this.averageRating = data.averageRating || 0;
        this.category = data.category || new CategoryModel({});
        this.icon = data.icon || '';
        this.vicinity = data.vicinity || '';
        this.alternativeNames = data.alternativeNames || [];
        this.openingHours = data.openingHours || new OpeningHoursModel({});
    }
}

export class SearchResultModel {
    label: string;
    locationId: string;
    constructor(data) {
        this.label = data.label || '';
        this.locationId = data.locationId || '';
    }
}

export class GetDisplayPositionLocationDetailModel {
    latitude: number;
    longitude: number;
    constructor(data) {
        this.latitude = data.latitude || '';
        this.longitude = data.longitude || '';
    }
}

export class GetLocationLocationDetailModel {
    displayPosition: GetDisplayPositionLocationDetailModel;
    constructor(data) {
        this.displayPosition = data.displayPosition || new GetDisplayPositionLocationDetailModel({});
    }
}
export class GetResultLocationDetailModel {
    location: GetLocationLocationDetailModel;
    constructor(data) {
        this.location = data.location || new GetLocationLocationDetailModel({});
    }
}

export class GetViewLocationDetailModel {
    result: GetResultLocationDetailModel[];
    constructor(data) {
        this.result = data.result || [];
    }
}

export class GetLocationDetailModel {
    view: GetViewLocationDetailModel[];
    constructor(data) {
        this.view = data.view || [];
    }
}
