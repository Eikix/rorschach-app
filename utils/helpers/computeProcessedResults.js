const computeProcessedResults = results => {
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
    } = locCountMapping;

    const computeGPct = (totalGs, totalRes) => {
        const res = Math.round((totalGs / totalRes) * 100);
        return res.toString() + '%';
    };

    const computeDPct = (totalDs, totalRes) => {
        const res = Math.round((totalDs / totalRes) * 100);
        return res.toString() + '%';
    };

    const computeDdPct = (totalDds, totalRes) => {
        const res = Math.round((totalDds / totalRes) * 100);
        return res.toString() + '%';
    };

    const computeDoPct = (totalDos, totalRes) => {
        const res = Math.round((totalDos / totalRes) * 100);
        return res.toString() + '%';
    };

    const computeDiPct = (totalDis, totalRes) => {
        const res = Math.round((totalDis / totalRes) * 100);
        return res.toString() + '%';
    };

    const computeAnxietyIdx = (contentCountMapping, totalResponses) => {
        const Hd =
            (contentCountMapping.hasOwnProperty('Hd') &&
                contentCountMapping['Hd']) ||
            0;
        const Anat =
            (contentCountMapping.hasOwnProperty('Anat') &&
                contentCountMapping['Anat']) ||
            0;
        const Sex =
            (contentCountMapping.hasOwnProperty('Sex') &&
                contentCountMapping['Sex']) ||
            0;
        const Sg =
            (contentCountMapping.hasOwnProperty('Sg') &&
                contentCountMapping['Sg']) ||
            0;
        const res = Math.round(((Hd + Anat + Sex + Sg) / totalResponses) * 100);
        return res.toString() + '%';
    };

    const computeInnerUncertaintyIdx = (Dds, Dos, Dbls, totalRes) => {
        return Math.round((Dds + Dos + Dbls) * (100 / totalRes)) + '%';
    };

    return {
        'G%': computeGPct(totalGLocs, totalResponses),
        'D%': computeDPct(totalDLocs, totalResponses),
        'Dd%': computeDdPct(totalDdLocs, totalResponses),
        'Do%': computeDoPct(DoLocs, totalResponses),
        'Di%': computeDiPct(DiLocs, totalResponses),
        'IA%': computeAnxietyIdx(contentCountMapping, totalResponses),
        'IUIdx%': computeInnerUncertaintyIdx(
            totalDdLocs,
            DoLocs,
            DblLocs,
            totalResponses
        ),
        Dets: detCountMapping,
        Contents: contentCountMapping,
    };
};

export default computeProcessedResults;
