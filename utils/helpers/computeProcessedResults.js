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

    const computeHPct = (contents, totalRes) => {
        const h = contents.hasOwnProperty('H') ? contents['H'] : 0;
        const hParenthesis = contents.hasOwnProperty('(H)')
            ? contents['(H)']
            : 0;
        const hd = contents.hasOwnProperty('Hd') ? contents['Hd'] : 0;
        const hdParenthesis = contents.hasOwnProperty('(Hd)')
            ? contents['(Hd)']
            : 0;
        const sceneH = contents.hasOwnProperty('Scène H')
            ? contents['Scène H']
            : 0;
        return (
            Math.round(
                (h + hParenthesis + hd + hdParenthesis + sceneH) *
                    (100 / totalRes)
            ) + '%'
        );
    };

    const computeAPct = (contents, totalRes) => {
        const a = contents.hasOwnProperty('A') ? contents['A'] : 0;
        const aParenthesis = contents.hasOwnProperty('(A)')
            ? contents['(A)']
            : 0;
        const ad = contents.hasOwnProperty('Ad') ? contents['Ad'] : 0;
        const adParenthesis = contents.hasOwnProperty('(Ad)')
            ? contents['(Ad)']
            : 0;
        const sceneA = contents.hasOwnProperty('Scène A')
            ? contents['Scène A']
            : 0;
        return (
            Math.round(
                (a + aParenthesis + ad + adParenthesis + sceneA) *
                    (100 / totalRes)
            ) + '%'
        );
    };

    const computeTRI = () => {};

    const computeFcompl = () => {};

    const computeFPct = (dets, totalRes) => {
        return Math.round((dets['FCount'] * 100) / totalRes) + '%';
    };

    const computeFPlusPct = dets => {
        if (dets.hasOwnProperty('F')) {
            return (
                Math.round(
                    ((dets['F'].pluses + dets['F'].plusminuses / 2) * 100) /
                        dets['FCount']
                ) + '%'
            );
        }
    };

    const computeFMinusPct = () => {};

    const computeFLargePct = () => {};

    const computeFPlusLargePct = () => {};

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
        'H%': computeHPct(contentCountMapping, totalResponses),
        'A%': computeAPct(contentCountMapping, totalResponses),
        'F%': computeFPct(detCountMapping, totalResponses),
        'F+%': computeFPlusPct(detCountMapping, totalResponses),
    };
};

export default computeProcessedResults;
