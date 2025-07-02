const MODES = {
    COLOR: 'color',
    BW: 'bw',
    GRAY: 'gray'
};

const SOURCES = {
    GLASS: 'glass',
    FEEDER: 'feeder',
    DUPLEX: 'duplex'
};

const PAGE_SIZES = {
    LETTER: 'letter',
    LEGAL: 'legal',
    A4: 'a4'
};

const PDF_COMPAT = {
    A1_b:'a1_b',
    A2_b:'a2_b',
    A3_b:'a3_b',
    A3_u:'a3_u'
};

class ScanBuilder {
    constructor(wrapper) {
        this.wrapper = wrapper;
        this.arguments = [];
    }

    withDevice(device) {
        this.arguments.push('--noprofile');
        this.arguments.push('--driver');
        this.arguments.push(device.driver.toLowerCase());
        this.arguments.push('--device');
        this.arguments.push(`${device.name}`);
        return this;
    }

    withPageSize(pageSize) {
        if (!PAGE_SIZES[pageSize]) {
            throw new Error('Invalid page size');
        }
        this.arguments.push(pageSize.toLowerCase());
        return this;
    }

    withProfile(profile) {
        if (profile) {
            this.arguments.push('-p');
            this.arguments.push(profile);
        }
        return this;
    }

    withDpi(dpi) {
        this.arguments.push('--dpi');
        this.arguments.push(dpi.toString());
        return this;
    }

    withMode(mode) {
        if (!MODES[mode.toUpperCase()]) {
            throw new Error('Invalid mode');
        }
        this.arguments.push('--bitdepth');
        this.arguments.push(mode.toLowerCase());
        return this;
    }

    withSource(source) {
        if (!SOURCES[source.toUpperCase()]) {
            throw new Error('Invalid source');
        }
        this.arguments.push('--source');
        this.arguments.push(source);
        return this;
    }

    forceFileWrite(enable) {
        if (enable) {
            this.arguments.push('-f');
        }
        return this;
    }

    withPDFOptions(options) {
        if (options.title) {
            this.arguments.push('--pdftitle');
            this.arguments.push(`${options.title}`);
        }
        if (options.author) {
            this.arguments.push('--pdfauthor');
            this.arguments.push(`${options.author}`);
        }
        if (options.keywords) {
            this.arguments.push('--pdfkeywords');
            this.arguments.push(`${options.keywords}`);
        }
        if (options.pdfCompat) {
            this.arguments.push('--pdfcompat');
            this.arguments.push(options.pdfCompat);
        }
        return this;
    }

    withDeskewEnabled(enabled) {
        if (enabled) {
            this.arguments.push('--deskew');
        }
        return this;
    }

    withRotation(degrees) {
        this.arguments.push('--rotate');
        this.arguments.push(degrees.toString());
        return this;
    }

    withOCRenabled(enabled, lang) {
        if (enabled) {
            this.arguments.push('--enableocr');
            this.arguments.push('--ocrlang');
            this.arguments.push(lang);
        } else {
            this.arguments.push('--disableocr');
        }
        return this;
    }

    showProgress(show) {
        if (show) {
            this.arguments.push('--progress');
        }
        return this;
    }

    async execute(outputPath) {
        const fullArgs = ['-o',outputPath];
        
        const forceIndex = this.arguments.indexOf('-f');
        if (forceIndex !== -1) {
            this.arguments.splice(forceIndex, 1);
            fullArgs.push('-f');
        }

        fullArgs.push(...this.arguments);

        const progressIndex = fullArgs.indexOf('--progress');
        if (progressIndex !== -1) {
            fullArgs.splice(progressIndex, 1);
            fullArgs.push('--progress');
        }

        return this.wrapper.executeCommand(fullArgs);
    }
}

module.exports = {
    ScanBuilder,
    MODES,
    SOURCES,
    PAGE_SIZES,
    PDF_COMPAT
};