const processResults = (results) => {

    // Major categories Arrays creation

    const locArray = [];
    const detArray = [];
    const signArray = [];
    const contentArray = [];
    const phenoArray = [];
    const answerTimeArray = [];


    // General test attributes to count : //

    let totalResponses;
    let colorPlancheResponses;
    let bans;
    let refusals;
    let prefs;
    let totalAnswerTime;
    let avgPlancheAnswerTime;

    // Localisation counting // 

    let totalGLocs;
    let totalDLocs;
    let totalDdLocs;
    let totalDoDiLocs;
    let GLocs;
    let DLocs;
    let DdLocs;
    let DoLocs;
    let DiLocs;

    // Determinant counting //

    let detFPlus;
    let detCPlus;
    let detEPlus;
    let detClobPlus;
    let detKPlus;
    let detKanPlus;
    let detKobPlus;
    let detKpPlus;

    
    let detFMinus;
    let detCMinus;
    let detEMinus;
    let detClobMinus;
    let detKMinus;
    let detKanMinus;
    let detKobMinus;
    let detKpMinus;

    
    let detFPlusMinus;
    let detCPlusMinus;
    let detEPlusMinus;
    let detClobPlusMinus;
    let detKPlusMinus;
    let detKanPlusMinus;
    let detKobPlusMinus;
    let detKpPlusMinus;

    // Contenus //


    const countResults = (res) => {
        const {planches} = res;
        const plancheNumbers = Object.keys(planches);
        plancheNumbers.map(plancheNb => {

            // Every Planche (1 to 10) has an attribute: "first", "second" or "third" for 1st, 2nd or 3rd perception.
            const plancheIds = Object.keys(planches[plancheNb]);
            plancheIds.map(id => {
                if (Object.keys(planches[plancheNb][id]).length !== 0) {
                    totalResponses++;
                    locArray.push(planches[plancheNb][id]?.localisation);
                    detArray.push(planches[plancheNb][id]?.determinant);
                    signArray.push(planches[plancheNb][id]?.determinantSign);
                    if (planches[plancheNb][id].contenus) contentArray.push(planches[plancheNb][id].contenus);
                    if (planches[plancheNb][id].phenomenes) phenoArray.push(planches[plancheNb][id].phenomenes);
                    if (planches[plancheNb][id].answerTime) answerTimeArray.push(planches[plancheNb][id].answerTime);
                }
            })


            
        })
    }

    countResults(results);
    console.log(locArray, detArray, signArray, contentArray, phenoArray, answerTimeArray);
    
}

export default processResults
