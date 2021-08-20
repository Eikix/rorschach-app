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

    const {
        totalGLocs,
        totalDLocs,
        totalDdLocs,
        totalDoDiLocs,
        DoLocs,
        DiLocs,
        DblLocs,
    } = locCountMapping

    const computeGPct = (totalGs, totalRes) => {
        const res = ((totalGs/totalRes)*100);
        return (res.toString() + '%');
    }

    const computeDPct = (totalDs, totalRes) => {
        const res = ((totalDs/ totalRes)*100);
        return (res.toString() + '%');
    }

    const computeDdPct = (totalDds, totalRes) => {
        const res = ((totalDds / totalRes) * 100);
        return (res.toString() + '%');
    }

    const computeDoPct = (totalDos, totalRes) => {
        const res = ((totalDos / totalRes) * 100);
        return (res.toString() + '%');
    }

    const computeDiPct = (totalDis, totalRes) => {
        const res = ((totalDis/ totalRes)*100);
        return (res.toString() + '%');
    }
    
    const computeAnxietyIdx = (contentCountMapping, totalResponses) => {
        const Hd = (contentCountMapping.hasOwnProperty("Hd") && contentCountMapping["Hd"]) || 0;
        const Anat = (contentCountMapping.hasOwnProperty("Anat") && contentCountMapping["Anat"]) || 0;
        const Sex = (contentCountMapping.hasOwnProperty("Sex") && contentCountMapping["Sex"]) || 0;
        const Sg = (contentCountMapping.hasOwnProperty("Sg") && contentCountMapping["Sg"]) || 0;
        const res = ((Hd + Anat + Sex + Sg) / totalResponses) * 100;
        return (res.toString()+'%');
    }

    const computeInnerUncertaintyIdx = (Dds, Dos, Dbls) => {
        
    }
    
    return {
        'G%': computeGPct(totalGLocs, totalResponses),
        'D%': computeDPct(totalDLocs, totalResponses),
        'Dd%': computeDdPct(totalDdLocs, totalResponses),
        'Do%': computeDoPct(DoLocs, totalResponses),
        'Di%': computeDiPct(DiLocs, totalResponses),
        'IA%': computeAnxietyIdx(contentCountMapping, totalResponses),
    }

}

export default computeProcessedResults