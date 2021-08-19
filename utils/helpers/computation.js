const computeProcessedResults = (results) => {
    const {
        totalResponses, 
        coloredResponses,
        locCountMapping,
        bans, 
        refusals, 
        contentCountMapping, 
        detCountMapping,
        avgTimePerPlanche,
    } = results;
    const computeGPct = (totalGs, totalRes) => {
        return ((totalGs/totalRes)*100);
    }
    return;

}

export default computeProcessedResults