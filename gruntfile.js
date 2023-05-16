/**
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 * @file datapos-engine-support/gruntfile.js
 * @license ISC Licensed under the ISC license, Version 2.0. See the LICENSE.md file for details.
 */

module.exports = (grunt) => {
    // Initialise configuration.
    grunt.initConfig({
        bump: { options: { commitFiles: ['-a'], commitMessage: 'Release v%VERSION%', pushTo: 'origin' } },
        gitadd: { task: { options: { all: true } } },
        run: {
            identifyLicensesUsingLicenseChecker: { args: ['license-checker', '--production', '--json', '--out', 'LICENSES.json'], cmd: 'npx' },
            identifyLicensesUsingNLF: { args: ['nlf', '-d'], cmd: 'npx' },
            lint: { args: ['WARNING: Lint is NOT implemented.'], cmd: 'echo' },
            npmPublish: { args: ['publish'], cmd: 'npx' },
            outdated: { args: ['npm', 'outdated'], cmd: 'npx' }
        },
        shell: {
            build: {
                command: ['vite build', 'mkdir dist/types', 'mv dist/*.d.ts dist/types/'].join('&&')
            }
        }
    });

    // Load external tasks.
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-git');
    grunt.loadNpmTasks('grunt-run');
    grunt.loadNpmTasks('grunt-shell');

    // Register standard repository management tasks.
    grunt.registerTask('forceOn', () => grunt.option('force', true));
    grunt.registerTask('forceOff', () => grunt.option('force', false));
    grunt.registerTask('build', ['shell:build']); // cmd+shift+b.
    grunt.registerTask('identifyLicenses', ['run:identifyLicensesUsingLicenseChecker', 'run:identifyLicensesUsingNLF']); // cmd+shift+i.
    grunt.registerTask('lint', ['run:lint']); // cmd+shift+l.
    grunt.registerTask('npmPublish', ['run:npmPublish']); // cmd+shift+n.
    grunt.registerTask('release', ['gitadd', 'bump', 'shell:build', 'run:npmPublish']); // cmd+shift+r.
    grunt.registerTask('synchronise', ['gitadd', 'bump']); // cmd+shift+s.
};
