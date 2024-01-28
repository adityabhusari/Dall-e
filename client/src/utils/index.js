import { surpriseMePrompts } from '../constants/index'
import FileSaver from 'file-saver'

export function getRandPrompt(prompt) {
    const randIndex = Math.floor(Math.random() * surpriseMePrompts.length);
    const randPropmt = surpriseMePrompts[randIndex];

    if (randPropmt == prompt) return getRandPrompt(prompt);

    return randPropmt
}

export function downloadImg(_id, photo) {
    FileSaver.saveAs(photo, `download-${_id}.jpg`)
}