import { contenusList } from '../details/plancheDetails';

const processResults = results => {
    // Major categories Arrays creation
    const colorPlanches = ['2', '3', '8', '9', '10'];

    const locArray = [];
    const detArray = [];
    let contentArray = [];
    let phenoArray = [];
    const answerTimeArray = [];

    // General test attributes to count : //

    let totalResponses = 0;
    let coloredResponses = 0;
    let bans = 0;
    let refusals = 0;
    let prefs = results?.preferences;
    let totalAnswerTime = 0;
    let avgPlancheAnswerTime = 0;

    // Localisation counting //

    let totalGLocs = 0;
    let totalDLocs = 0;
    let totalDdLocs = 0;
    let totalDoDiLocs = 0;
    let DoLocs = 0;
    let DiLocs = 0;
    let DblLocs = 0;

    /* Determinant counting
    
    Determinants are one of ["F", "K", "Kst", "K rép", "K ref", "kan", "kan st", "kan rép", "kan ref", "kob", "kp", "kp stat", "FC", "CF","C", "Cn", `C'`, "KC", "kan C", "kob C", "Kp C", "FE", "EF", "E", "F clob", "Clob F", "Clob", "Aucun"]

    We'll want to identify: 
        - answer starting in F, C, E, K, kan, kob, kp and Clob.
        - answers with an associated sign (+, -, +/-).
        - Type de résonnance intime (TRI) : no. of K's / (C answers points (0.5, 1.0, or 1.5 depending on the det))
        - Fcompl formula : no. of k's / (E answers points (0.5, 1.0, or 1.5 depending on the det))

    
    */

    // Contenus //

    const countResults = res => {
        const { planches } = res;
        const plancheNumbers = Object.keys(planches);
        plancheNumbers.map(plancheNb => {
            // Every Planche (1 to 10) has an attribute: "first", "second" or "third" for 1st, 2nd or 3rd perception.
            const plancheIds = Object.keys(planches[plancheNb]);
            plancheIds.map(id => {
                if (Object.keys(planches[plancheNb][id]).length !== 0) {
                    if (
                        colorPlanches.includes(plancheNb) &&
                        !planches[plancheNb][id].phenomenes.includes('Refus')
                    )
                        coloredResponses++;
                    if (!planches[plancheNb][id].phenomenes.includes('Refus'))
                        totalResponses++;
                    locArray.push(planches[plancheNb][id]?.localisation);
                    detArray.push(planches[plancheNb][id]?.determinant);
                    if (planches[plancheNb][id].contenus) {
                        contentArray = [
                            ...contentArray,
                            ...planches[plancheNb][id].contenus,
                        ];
                    }
                    if (planches[plancheNb][id].phenomenes) {
                        phenoArray = [
                            ...phenoArray,
                            ...planches[plancheNb][id].phenomenes,
                        ];
                    }
                    if (planches[plancheNb][id].answerTime) {
                        answerTimeArray.push(
                            planches[plancheNb][id].answerTime
                        );
                    }
                }
            });
        });
    };

    const countLocs = locArray => {
        const GLocsArray = ['G', 'G barré', 'Gbl', 'Gconf', 'Gcont'];
        const DLocsArray = ['D', 'Dbl D', 'D Dbl', 'Dbl'];
        const DdLocsArray = ['Dd', 'Dd Dbl', 'Ddbl'];
        const DblLocsArray = ['Dbl D', 'D Dbl', 'Dbl', 'Dd Dbl'];
        locArray.map(loc => {
            if (GLocsArray.includes(loc)) totalGLocs++;
            if (DLocsArray.includes(loc)) totalDLocs++;
            if (DdLocsArray.includes(loc)) totalDdLocs++;
            if (loc === 'Do') {
                DoLocs++;
                totalDoDiLocs++;
            }
            if (loc === 'Di') {
                DiLocs++;
                totalDoDiLocs++;
            }
            if (DblLocsArray.includes(loc)) DblLocs++;
        });
    };

    const countBans = phenoArray => {
        if (phenoArray)
            phenoArray.map(pheno => {
                if (pheno === 'Ban') bans++;
            });
    };

    const countRefusals = phenoArray => {
        if (phenoArray)
            phenoArray.map(pheno => {
                if (pheno === 'Refus') refusals++;
            });
    };

    const countTotalTime = answerTimeArray => {
        if (answerTimeArray)
            answerTimeArray.map(answerTime => {
                totalAnswerTime += answerTime;
            });
    };

    const countAvgTimePerPlanche = () => {
        return totalAnswerTime / totalResponses;
    };

    const countContent = contentArray => {
        const contentCountMapping = {};
        if (contentArray)
            contentArray.map(content => {
                if (
                    contenusList.includes(content) &&
                    !contentCountMapping.hasOwnProperty(content)
                ) {
                    contentCountMapping[content] = 0;
                }
                if (
                    contenusList.includes(content) &&
                    contentCountMapping.hasOwnProperty(content)
                ) {
                    contentCountMapping[content]++;
                }
            });
        return contentCountMapping;
    };

    const countDet = detArray => {
        const possibleDets = [
            'F',
            'K',
            'Kst',
            'K rép',
            'K ref',
            'kan',
            'kan st',
            'kan rép',
            'kan ref',
            'kob',
            'kp',
            'kp stat',
            'FC',
            'CF',
            'C',
            'Cn',
            `C'`,
            'KC',
            'kan C',
            'kob C',
            'Kp C',
            'FE',
            'EF',
            'E',
            'F clob',
            'Clob F',
            'Clob',
        ];
        const FDets = ['F', 'FC', 'FE', 'F clob'];
        const KDets = ['K', 'Kst', 'K rép', 'K ref', 'KC', 'Kp C'];
        const kanDets = ['kan', 'kan st', 'kan rép', 'kan ref', 'kan C'];
        const kobDets = ['kob', 'kob C'];
        const kpDets = ['kp', 'kp stats'];
        const CDets = ['CF', 'C', 'Cn', "C'"];
        const ClobDets = ['Clob F', 'Clob'];
        const EDets = ['EF', 'E'];

        const detCountMapping = {
            FCount: 0,
            KCount: 0,
            kanCount: 0,
            kobCount: 0,
            kpCount: 0,
            CCount: 0,
            clobCount: 0,
            ECount: 0,
        };
        if (detArray)
            detArray.map(det => {
                if (
                    possibleDets.includes(det.value) &&
                    !detCountMapping.hasOwnProperty(det.value)
                ) {
                    detCountMapping[det.value] = {
                        totalCount: 0,
                        pluses: 0,
                        minuses: 0,
                        plusminuses: 0,
                        unsigneds: 0,
                    };
                }
                if (
                    possibleDets.includes(det.value) &&
                    detCountMapping.hasOwnProperty(det.value)
                ) {
                    detCountMapping[det.value].totalCount++;
                    switch (det.sign) {
                        case '( + )':
                            detCountMapping[det.value].pluses++;
                            break;
                        case '( - )':
                            detCountMapping[det.value].minuses++;
                            break;
                        case '( +/- )':
                            detCountMapping[det.value].plusminuses++;
                            break;
                        case 'Aucun':
                            detCountMapping[det.value].unsigneds++;
                            break;
                    }
                }
                if (FDets.includes(det.value)) detCountMapping.FCount++;
                if (KDets.includes(det.value)) detCountMapping.KCount++;
                if (kpDets.includes(det.value)) detCountMapping.kpCount++;
                if (kanDets.includes(det.value)) detCountMapping.kanCount++;
                if (kobDets.includes(det.value)) detCountMapping.kobCount++;
                if (CDets.includes(det.value)) detCountMapping.CCount++;
                if (ClobDets.includes(det.value)) detCountMapping.clobCount++;
                if (EDets.includes(det.value)) detCountMapping.ECount++;
            });
        return detCountMapping;
    };

    countResults(results);
    countLocs(locArray);
    countBans(phenoArray);
    countRefusals(phenoArray);
    countTotalTime(answerTimeArray);
    const contentCountMapping = countContent(contentArray);
    const locCountMapping = {
        totalGLocs,
        totalDLocs,
        totalDdLocs,
        totalDoDiLocs,
        DoLocs,
        DiLocs,
        DblLocs,
    };
    const avgTimePerPlanche = countAvgTimePerPlanche();
    const detCountMapping = countDet(detArray);

    return {
        totalResponses,
        coloredResponses,
        locCountMapping,
        bans,
        refusals,
        contentCountMapping,
        detCountMapping,
        avgTimePerPlanche,
        preferences: prefs,
    };
};

export default processResults;
