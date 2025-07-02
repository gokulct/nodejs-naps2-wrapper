# NAPS2 Node.js Wrapper

A Node.js wrapper for NAPS2 (Not Another PDF Scanner 2) that provides a simple, fluent interface for scanning documents programmatically.

## Installation

```bash
npm install nodejs-naps2-wrapper
```

## Features

- Fluent builder interface for scan configuration
- Support for multiple scan sources (Glass, Feeder, Duplex)
- PDF output with customizable metadata
- OCR support with language selection
- Device detection and management
- Various scan modes (Color, Black & White, Grayscale)
- Customizable DPI settings
- Automatic deskewing
- Page rotation
- Progress tracking

## Quick Start

```javascript
const NAPS2 = require('naps2-wrapper');
const { MODES, SOURCES } = require('naps2-wrapper');

async function example() {
    const naps2 = new NAPS2();
    try {
        // List available devices
        const devices = await naps2.listDevices('twain');
        
        // Create and execute a scan
        const result = await naps2.createScanBuilder()
            .withDevice(devices[0])
            .withDpi(300)
            .withMode(MODES.COLOR)
            .withSource(SOURCES.GLASS)
            .withPDFOptions({
                title: 'My Scan',
                author: 'User',
                keywords: 'scan,document'
            })
            .withDeskewEnabled(true)
            .withOCRenabled(true, 'en')
            .execute('output.pdf');
            
        console.log('Scan completed:', result);
    } catch (error) {
        console.error('Scan failed:', error);
    }
}
```

## API Reference

### Class: NAPS2

#### Methods

- `listDevices(driver: string)`: Lists available scanning devices
- `scan(outputPath: string)`: Performs a basic scan
- `createScanBuilder()`: Creates a new ScanBuilder instance

### Class: ScanBuilder

#### Methods

- `withDevice(device)`: Sets the scanning device
- `withPageSize(pageSize)`: Sets the page size (LETTER, LEGAL, A4)
- `withProfile(profile)`: Sets the scanning profile
- `withDpi(dpi)`: Sets the scanning DPI
- `withMode(mode)`: Sets the scanning mode (COLOR, BW, GRAY)
- `withSource(source)`: Sets the scan source (GLASS, FEEDER, DUPLEX)
- `withPDFOptions(options)`: Sets PDF metadata
- `withDeskewEnabled(enabled)`: Enables/disables automatic deskewing
- `withRotation(degrees)`: Sets rotation angle
- `withOCRenabled(enabled, lang)`: Enables/disables OCR with language selection
- `forceFileWrite(enable)`: Forces file overwrite
- `showProgress(show)`: Shows scan progress
- `execute(outputPath)`: Executes the scan with the configured settings

### Constants

```javascript
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
    A1_b: 'a1_b',
    A2_b: 'a2_b',
    A3_b: 'a3_b',
    A3_u: 'a3_u'
};
```

## PDF Options

The `withPDFOptions` method accepts an object with the following properties:

```javascript
{
    title: string,      // PDF document title
    author: string,     // PDF document author
    keywords: string,   // PDF keywords
    pdfCompat: string   // PDF compatibility mode
}
```

## Error Handling

The library throws errors for:
- Invalid page sizes
- Invalid scan modes
- Invalid sources
- Device connection issues
- Scan execution failures

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- NAPS2 (Not Another PDF Scanner 2) project