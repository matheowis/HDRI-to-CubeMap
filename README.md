# HDRI-to-CubeMap

It converts spherical maps to cube maps

live version on https://matheowis.github.io/HDRI-to-CubeMap/

Just upload a spherical map (.hdr, .png, .jpg) => check out preview (You can rotate both of them) => save it

you can get some spherical maps at https://hdrihaven.com

# Run it localy
It works way better on localhost, I'm tring to figure out why...

navigate to the root of this project and use these commands

```npm install```

```npm start```

now it works on http://localhost:8080/

# known issues

When You are out of RAM you lose webgl context, you may get black screen when it happens, than the page will stop working, and it will require reload, if your RAM usage is still high, You may be unable to view page. If Your source map wont be higher than 4096 px, it should work fine
