import 'zone.js';
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';

try {
    getTestBed().initTestEnvironment(
        BrowserTestingModule,
        platformBrowserTesting()
    );
} catch (e) {
    // Ignore
}
