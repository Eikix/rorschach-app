import { contenusList } from "../details/plancheDetails";

const processResults = (results) => {

    // Major categories Arrays creation

    const locArray = [];
    const detArray = [];
    const signArray = [];
    let contentArray = [];
    let phenoArray = [];
    const answerTimeArray = [];


    // General test attributes to count : //

    let totalResponses = 0;
    let colorPlancheResponses = 0;
    let bans = 0;
    let refusals = 0;
    let prefs = [];
    let totalAnswerTime = 0;
    let avgPlancheAnswerTime = 0;

    // Localisation counting // 

    const GLocsArray = ["G", "G barré", "Gbl", "Gconf", "Gcont"];
    const DLocsArray = ["D", "Dbl D", "D Dbl", "Dbl"];
    const DdLocsArray = ["Dd", "Dd Dbl", "Ddbl"];


    let totalGLocs = 0;
    let totalDLocs = 0;
    let totalDdLocs = 0;
    let totalDoDiLocs = 0;
    let DoLocs = 0;
    let DiLocs = 0;

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
                    if (planches[plancheNb][id].contenus) {
                        contentArray = [...contentArray, ...planches[plancheNb][id].contenus];
                    }
                    if (planches[plancheNb][id].phenomenes) {
                        phenoArray = [...phenoArray, ...planches[plancheNb][id].phenomenes];
                    }
                    if (planches[plancheNb][id].answerTime) {
                        answerTimeArray = answerTimeArray.push(planches[plancheNb][id].answerTime);
                    }
                }
            })


            
        })
    }

    const countLocs = (locArray) => {
        locArray.map(loc => {
            if (GLocsArray.includes(loc)) totalGLocs++;
            if (DLocsArray.includes(loc)) totalDLocs++;
            if (DdLocsArray.includes(loc)) totalDdLocs++;
            if (loc === "Do") {
                DoLocs++;
                totalDoDiLocs++;
            }
            if (loc === "Di") {
                DiLocs++;
                totalDoDiLocs++;
            }

        })
    }

    const countBans = (phenoArray) => {
        if (phenoArray) phenoArray.map(pheno => {
            if (pheno === "Ban") bans++;
        });
    }

    const countRefusals = (phenoArray) => {
        if (phenoArray) phenoArray.map(pheno => {
            if (pheno === "Refus") refusals++;
        });
    }

    const countTotalTime = (answerTimeArray) => {
        if (answerTimeArray) answerTimeArray.map(answerTime => {
            totalAnswerTime += answerTime;
        });
    }

    const countContent = (contentArray) => {
        const contentCountMapping = {}
        if (contentArray) contentArray.map(content => {
            if (contenusList.includes(content) && !contentCountMapping.hasOwnProperty(content)) {
                contentCountMapping[content] = 0;
            }
            if (contenusList.includes(content) && contentCountMapping.hasOwnProperty(content)) {
                contentCountMapping[content]++;
            }
        })
        return contentCountMapping;
    }

    countResults(results);
    countLocs(locArray);
    countBans(phenoArray);
    countRefusals(phenoArray);
    countTotalTime(answerTimeArray);
    const contentCountMapping = countContent(contentArray);
    console.log(totalResponses, locArray, detArray, signArray, contentArray, phenoArray, answerTimeArray, totalDLocs, bans, refusals, contentCountMapping);
    
}

export default processResults
