import { SciChartSurface, NumericAxis, FastColumnRenderableSeries, XyDataSeries, SciChartJsNavyTheme } from 'scichart';
async function drawChart() {
    const { sciChartSurface, wasmContext } = await SciChartSurface.create('chart', {
        theme: new SciChartJsNavyTheme()
    });
    const hraci = await fetch('hraci.json').then(r => r.json());
    const mena = hraci.map((h) => h.meno);
    const goly = hraci.map((h) => Number(h.hodnota));
    sciChartSurface.xAxes.add(new NumericAxis(wasmContext)); //wasmContext je "prostredie" SciChartu — skoro každý objekt
    sciChartSurface.yAxes.add(new NumericAxis(wasmContext)); //v SciCharte ho potrebuje ako prvý parameter, je to také povinné "heslo"
    sciChartSurface.renderableSeries.add(new FastColumnRenderableSeries(wasmContext, {
        dataSeries: new XyDataSeries(wasmContext, {
            xValues: goly.map((_, i) => i),
            yValues: goly
        })
    }));
}
drawChart();
