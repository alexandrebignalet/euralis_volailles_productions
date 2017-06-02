import {HomeComponent} from './home.component';
import template from './home.html';

describe('Home Component', () => {
    let component;

    beforeEach(() => {
        component = HomeComponent;
    });

    it('should be init correctly', () => {
        expect(component.controller).not.toBeNull();
        expect(component.bindings).toEqual({});
        expect(component.template).toEqual(template);
        expect(component.controllerAs).toEqual('vm');
    });
});