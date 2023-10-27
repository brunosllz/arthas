import Strikethrough from '@tiptap/extension-strike'

export const CustomStrikethrough = Strikethrough.extend({
  addKeyboardShortcuts() {
    return {
      'Mod-s': () => this.editor.commands.toggleStrike(),
    }
  },
})
