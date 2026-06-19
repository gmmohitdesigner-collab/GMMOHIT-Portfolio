/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import { Config } from "@remotion/cli/config";
import { enableTailwind } from '@remotion/tailwind-v4';

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.overrideWebpackConfig(enableTailwind);

// Force Headless Chrome to use the dedicated RTX 3050 GPU via hardware acceleration!
// Without this, headless Chrome often defaults to software rendering which crashes on heavy WebGL.
Config.setChromiumOpenGlRenderer('angle');

// Restrict concurrency to 1. Rendering 8 heavy WebGL frames simultaneously will 
// instantly max out the VRAM on most GPUs (even RTX cards) and cause a crash.
Config.setConcurrency(1);

// Increase render timeout to 120 seconds to allow the heavy Cinematic WebGL shaders
// and massive UIcard textures to compile without crashing the headless Chrome instance.
Config.setDelayRenderTimeoutInMilliseconds(120000);
