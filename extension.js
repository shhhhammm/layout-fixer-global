
import Clutter from 'gi://Clutter';
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';


import * as Keyboard from 'resource:///org/gnome/shell/ui/status/keyboard.js'


export default class LayoutFixerGlobal extends Extension {
    enable() {
        this._settings = this.getSettings('org.gnome.shell.extensions.layout-fixer-global');
        let backend = Clutter.get_default_backend();
        this._keyboard = backend.get_default_seat().create_virtual_device(Clutter.InputDeviceType.KEYBOARD_DEVICE);
        this._keyboardManager = Keyboard.getInputSourceManager();
        this._timeoutIds = new Set();
        this._isProcessing = false;


    }

    disable() {
        this._settings = null;
        this._keyboard = null;
        this._keyboardManager = null;
        this._timeoutIds = null;
        this._isProcessing = false;
    }

    _getAvailableLayouts() {
        return Object.values(this._keyboardManager.inputSources);
    }


    _getCurrentLayout() {
        return this._keyboardManager.currentSource;
    }

    /**
     * @param {{ activate: () => void; }} layout
     */
    _setLayout(layout) {
        layout?.activate();
    }



}