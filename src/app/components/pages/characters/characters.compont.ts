import { Component, Input, ChangeDetectionStrategy } from '@angular/core'
import { Characters } from '@app/shared/interfaces/characters.interfaces'

@Component({
    selector: 'app-character',
    template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CharacterComponent{
    @Input()character: Characters
}