import { SciChartSurface, NumericAxis, TextLabelProvider, FastColumnRenderableSeries, XyDataSeries, SciChartJsNavyTheme } from 'scichart'
SciChartSurface.useWasmFromCDN()

async function drawChart() {
    const { sciChartSurface, wasmContext } = await SciChartSurface.create('chart', {
        theme: new SciChartJsNavyTheme()
    })
    const hraci = await fetch('hraci.json').then(r => r.json())

    const hraciSGolmi = hraci.filter((h: any) => Number(h.hodnota) > 0)
    const mena = hraciSGolmi.map((h: any) => h.meno.split(' ').pop())

    sciChartSurface.xAxes.add(new NumericAxis(wasmContext, {
        labelProvider: new TextLabelProvider({
            labels: mena
        }),
        majorDelta: 1,
        minorDelta: 1,
        labelStyle: {
            fontSize: 10
        },
        maxAutoTicks: mena.length,
        autoTicks: false
    }))

    sciChartSurface.yAxes.add(new NumericAxis(wasmContext)) //wasmContext potrebuje proste vsetko

    sciChartSurface.renderableSeries.add(
        new FastColumnRenderableSeries(wasmContext, {
            dataSeries: new XyDataSeries(wasmContext, {
                xValues: hraciSGolmi.map((_: any, i: number) => i),
                yValues: hraciSGolmi.map((h: any) => Number(h.hodnota))
            })
        })
    )
}

drawChart()