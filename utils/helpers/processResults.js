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

    /* Determinant counting
    
    Determinants are one of ["F", "K", "Kst", "K rép", "K ref", "kan", "kan st", "kan rép", "kan ref", "kob", "kp", "kp stat", "FC", "CF","C", "Cn", `C'`, "KC", "kan C", "kob C", "Kp C", "FE", "EF", "E", "F clob", "Clob F", "Clob", "Aucun"]

    We'll want to identify: 
        - answer starting in F, C, E, K, kan, kob, kp and Clob.
        - answers with an associated sign (+, -, +/-).
        - Type de résonnance intime (TRI) : no. of K's / (C answers points (0.5, 1.0, or 1.5 depending on the det))
        - Fcompl formula : no. of k's / (E answers points (0.5, 1.0, or 1.5 depending on the det))

    
    */


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

    const countDet = (detArray) => {
        const possibleDets = ["F", "K", "Kst", "K rép", "K ref", "kan", "kan st", "kan rép", "kan ref", "kob", "kp", "kp stat", "FC", "CF","C", "Cn", `C'`, "KC", "kan C", "kob C", "Kp C", "FE", "EF", "E", "F clob", "Clob F", "Clob", "Aucun"];
        const FDets = ["F", "FC", "FE", "F clob"];
        const KDets = ["K", "Kst", "K rép", "K ref", "KC", "Kp C"];
        const kanDets = ["kan", "kan st", "kan rép", "kan ref", "kan C"];
        const kobDets = ["kob", "kob C"];
        const kpDets = ["kp", "kp stats"];
        const CDets = ["CF", "C", "Cn", "C'" ];
        const ClobDets = ["Clob F", "Clob"];
        const EDets = ["EF", "E"];

        

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
