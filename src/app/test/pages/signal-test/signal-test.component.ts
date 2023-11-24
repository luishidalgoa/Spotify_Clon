import { Component, Signal, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SignalService} from "../../service/signal.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signal-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './signal-test.component.html',
  styleUrl: './signal-test.component.scss',
})
export class SignalTestComponent {
  private subcription!: Subscription;
  variable: Signal<number>=signal(0);
  number!: number;
  constructor(public signalS: SignalService) {
    // esta variable number guardara el valor de la signal pero no tendra una referencia directa a la signal
    this.number = this.signalS.variable$();

    // esta variable number2 creara una signal computed. Esta signal se actualizara cada vez que se actualice sin embargo no sera writeable por lo que no podremos actualizarla
    this.variable = computed(() => this.signalS.variable$()*2);

    //si queremos actualizar un valor de la signal tendremos que hacer referencia a la signal del servicio y hacerle update
    setTimeout(() => {
      this.signalS.variable$.update(() => 15);
      // this.variable al ser un computed y multiplicar *2 el valor de la signal. El resultado sera 30.
      //this.signalS.variable$() = 15;
      // this.variable() =30;
    }, 5000);


    /**
     * Cuando se detecte algun cambio en alguna de las señales que se estan escuchando se ejecutara el callback
     * de modo que podria ser una alternativa a los observables. Sin embargo no es muy recomendable ya que
     * si tuvieses que escuchar muchas señales, cada vez que se actualice una de ellas se ejecutara el callback
     * cuando en realidad solo te interesa que se ejecute cuando se actualice una en concreto.
     */
    effect(() => {
      this.number = this.signalS.variable$();
      console.log('number updated', this.number);
    });
  }
  ngOnInit() {
  }
}
