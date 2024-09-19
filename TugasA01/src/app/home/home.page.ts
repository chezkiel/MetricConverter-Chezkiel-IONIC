import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  availableUnits: { label: string, value: string }[] = [];
  fromUnit: string = '';
  toUnit: string = '';
  inputValue: number = 0;
  outputValue: number = 0;

  metricUnits = {
    panjang: [
      { label: 'Kilometer (km)', value: 'km' },
      { label: 'Meter (m)', value: 'm' },
      { label: 'Sentimeter (cm)', value: 'cm' },
      { label: 'Milimeter (mm)', value: 'mm' },
      { label: 'Nanometer (nm)', value: 'nm' }
    ],
    massa: [
      { label: 'Kilogram (kg)', value: 'kg' },
      { label: 'Gram (g)', value: 'g' },
      { label: 'Miligram (mg)', value: 'mg' },
      { label: 'Mikrogram (µg)', value: 'µg' },
      { label: 'Ton (t)', value: 't' }
    ],
    waktu: [
      { label: 'Jam (h)', value: 'h' },
      { label: 'Menit (min)', value: 'min' },
      { label: 'Detik (s)', value: 's' },
      { label: 'Milidetik (ms)', value: 'ms' },
      { label: 'Mikrodetik (µs)', value: 'µs' }
    ]
  };

  conversionFactors = {
    panjang: {
      km: 1000,
      m: 1,
      cm: 0.01,
      mm: 0.001,
      nm: 1e-9
    },
    massa: {
      kg: 1000,
      g: 1,
      mg: 0.001,
      'µg': 1e-6,
      t: 1000000
    },
    waktu: {
      h: 3600,
      min: 60,
      s: 1,
      ms: 0.001,
      'µs': 1e-6
    }
  };

  constructor() { }

  onMetricChange(event: any) {
    const selectedMetric = event.detail.value as keyof typeof this.metricUnits;
    this.availableUnits = this.metricUnits[selectedMetric] || [];
    this.convert();

    this.inputValue = 0;
    this.outputValue = 0;
    this.fromUnit = '';
    this.toUnit = '';
  }

  convert() {
    if (this.fromUnit && this.toUnit && this.inputValue !== null) {
      const selectedMetric = Object.keys(this.metricUnits).find(metric => 
        this.metricUnits[metric as keyof typeof this.metricUnits].some(unit => unit.value === this.fromUnit)
      ) as keyof typeof this.conversionFactors;

      if (selectedMetric) {
        const fromFactor = this.conversionFactors[selectedMetric][this.fromUnit as keyof typeof this.conversionFactors[keyof typeof this.conversionFactors]];
        const toFactor = this.conversionFactors[selectedMetric][this.toUnit as keyof typeof this.conversionFactors[keyof typeof this.conversionFactors]];

        this.outputValue = this.inputValue * (fromFactor / toFactor);
      } else {
        this.outputValue = 0;
      }
    } else {
      this.outputValue = 0;
    }
  }
  
}
