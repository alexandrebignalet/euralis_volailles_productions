export const facility = () => {

    const filter = (productions, facilityType, facilityNb) => {
        if(!facilityType || !facilityNb) return productions;

        let out = [];

        productions.forEach((production) => {
            if(production.facility.type.key === facilityType.key) {
                production.setFacilitiesNb(facilityNb);
                out.push(production);
            }
        });

        return out;
    };

    return filter;
};