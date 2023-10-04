import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.f28a839a.js";const h=JSON.parse('{"title":"模板内置方法","description":"","frontmatter":{},"headers":[],"relativePath":"docs/005-builtin-methods.md","filePath":"docs/005-builtin-methods.md"}'),p={name:"docs/005-builtin-methods.md"},o=l(`<h1 id="模板内置方法" tabindex="-1">模板内置方法 <a class="header-anchor" href="#模板内置方法" aria-label="Permalink to &quot;模板内置方法&quot;">​</a></h1><p>在模板语法中，可以调用一些内置的方法，这些方法可以帮助我们更方便的编写脚本。</p><p>例如，可以轻松实现一个由用户自行选择的功能，效果如下：</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">😸</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Command</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">running</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">on</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/root/workspace/co</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> What fruits </span><span style="color:#F97583;">do</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">you</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">like?</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">…</span></span>
<span class="line"><span style="color:#B392F0;">▸</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Apple</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">Banana</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">Cherry</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">Grape</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">😸</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Command</span><span style="color:#24292E;"> </span><span style="color:#032F62;">running</span><span style="color:#24292E;"> </span><span style="color:#032F62;">on</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/root/workspace/co</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">?</span><span style="color:#24292E;"> What fruits </span><span style="color:#D73A49;">do</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">you</span><span style="color:#24292E;"> </span><span style="color:#032F62;">like?</span><span style="color:#24292E;"> </span><span style="color:#032F62;">…</span></span>
<span class="line"><span style="color:#6F42C1;">▸</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Apple</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">Banana</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">Cherry</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">Grape</span></span></code></pre></div><h2 id="loadnodemodulebin" tabindex="-1">loadNodeModuleBin <a class="header-anchor" href="#loadnodemodulebin" aria-label="Permalink to &quot;loadNodeModuleBin&quot;">​</a></h2><p>Alias: <code>loadNodeModuleBin</code>, <code>lnb</code></p><p>执行 node_modules 中的本地包命令</p><p>编写 JavaScript 时，我们有时会安装一些带有命令的包，但我们有时又不想安装到全局。</p><p><code>typescript</code> 包自带了名为 <code>tsc</code> 的命令，想调用这些局部的命令很简单。</p><p>例如，下面我们编写一个查找 <code>tsc</code> 命令所在路径的功能：</p><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">&quot;where</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">is</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">tsc&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">commands = [</span><span style="color:#9ECBFF;">&quot;where-is-tsc&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;wt&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">scripts = [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;echo tsc in: &lt;%= lnb(&#39;typescript&#39;, &#39;tsc&#39;) %&gt;&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># or</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># &quot;echo tsc in: &lt;%= loadNodeModuleBin(&#39;typescript&#39;, &#39;tsc&#39;) %&gt;&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[</span><span style="color:#6F42C1;">&quot;where</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">is</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">tsc&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">commands = [</span><span style="color:#032F62;">&quot;where-is-tsc&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;wt&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">scripts = [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;echo tsc in: &lt;%= lnb(&#39;typescript&#39;, &#39;tsc&#39;) %&gt;&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># or</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># &quot;echo tsc in: &lt;%= loadNodeModuleBin(&#39;typescript&#39;, &#39;tsc&#39;) %&gt;&quot;,</span></span>
<span class="line"><span style="color:#24292E;">]</span></span></code></pre></div><h2 id="interactive" tabindex="-1">interactive <a class="header-anchor" href="#interactive" aria-label="Permalink to &quot;interactive&quot;">​</a></h2><p>Alias: <code>interactive</code>, <code>ui</code>, <code>ia</code></p><p>交互式接受用户输入</p><p>可以实现单选、多选、Y/N 等丰富的交互式功能，基于 <a href="https://github.com/enquirer/enquirer#built-in-prompts" target="_blank" rel="noreferrer">enquirer</a>，可以查看文档来了解更多。</p><p>下面是一些常用的 Demo。</p><h2 id="select" tabindex="-1">select <a class="header-anchor" href="#select" aria-label="Permalink to &quot;select&quot;">​</a></h2><p><img src="https://raw.githubusercontent.com/enquirer/enquirer/master/media/select-prompt.gif" alt=""></p><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">&quot;interactive&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">commands = [</span><span style="color:#9ECBFF;">&quot;ui&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">scripts = [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&#39;&#39;&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">    echo &#39;&lt;%= JSON.stringify(</span></span>
<span class="line"><span style="color:#9ECBFF;">            await ui({</span></span>
<span class="line"><span style="color:#9ECBFF;">            type: &quot;select&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">            message: &quot;What fruits do you like?&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">            choices: [&quot;Apple&quot;, &quot;Banana&quot;, &quot;Cherry&quot;, &quot;Grape&quot;],</span></span>
<span class="line"><span style="color:#9ECBFF;">        })</span></span>
<span class="line"><span style="color:#9ECBFF;">    ) %&gt;&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">    &#39;&#39;&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[</span><span style="color:#6F42C1;">&quot;interactive&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">commands = [</span><span style="color:#032F62;">&quot;ui&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">scripts = [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&#39;&#39;&#39;</span></span>
<span class="line"><span style="color:#032F62;">    echo &#39;&lt;%= JSON.stringify(</span></span>
<span class="line"><span style="color:#032F62;">            await ui({</span></span>
<span class="line"><span style="color:#032F62;">            type: &quot;select&quot;,</span></span>
<span class="line"><span style="color:#032F62;">            message: &quot;What fruits do you like?&quot;,</span></span>
<span class="line"><span style="color:#032F62;">            choices: [&quot;Apple&quot;, &quot;Banana&quot;, &quot;Cherry&quot;, &quot;Grape&quot;],</span></span>
<span class="line"><span style="color:#032F62;">        })</span></span>
<span class="line"><span style="color:#032F62;">    ) %&gt;&#39;</span></span>
<span class="line"><span style="color:#032F62;">    &#39;&#39;&#39;</span></span>
<span class="line"><span style="color:#24292E;">]</span></span></code></pre></div><h2 id="confirm" tabindex="-1">confirm <a class="header-anchor" href="#confirm" aria-label="Permalink to &quot;confirm&quot;">​</a></h2><p><img src="https://raw.githubusercontent.com/enquirer/enquirer/master/media/confirm-prompt.gif" alt=""></p><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">&quot;interactive&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">commands = [</span><span style="color:#9ECBFF;">&quot;ui&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">scripts = [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&#39;&#39;&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">    echo &#39;&lt;%= JSON.stringify(</span></span>
<span class="line"><span style="color:#9ECBFF;">        await ui({</span></span>
<span class="line"><span style="color:#9ECBFF;">            type: &quot;confirm&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">            message: &quot;This operation is irreversible, are you sure you want to execute it?&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">        })</span></span>
<span class="line"><span style="color:#9ECBFF;">    ) %&gt;&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">    &#39;&#39;&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[</span><span style="color:#6F42C1;">&quot;interactive&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">commands = [</span><span style="color:#032F62;">&quot;ui&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">scripts = [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&#39;&#39;&#39;</span></span>
<span class="line"><span style="color:#032F62;">    echo &#39;&lt;%= JSON.stringify(</span></span>
<span class="line"><span style="color:#032F62;">        await ui({</span></span>
<span class="line"><span style="color:#032F62;">            type: &quot;confirm&quot;,</span></span>
<span class="line"><span style="color:#032F62;">            message: &quot;This operation is irreversible, are you sure you want to execute it?&quot;,</span></span>
<span class="line"><span style="color:#032F62;">        })</span></span>
<span class="line"><span style="color:#032F62;">    ) %&gt;&#39;</span></span>
<span class="line"><span style="color:#032F62;">    &#39;&#39;&#39;</span></span>
<span class="line"><span style="color:#24292E;">]</span></span></code></pre></div><h2 id="input" tabindex="-1">input <a class="header-anchor" href="#input" aria-label="Permalink to &quot;input&quot;">​</a></h2><p><img src="https://raw.githubusercontent.com/enquirer/enquirer/master/media/input-prompt.gif" alt=""></p><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">&quot;interactive&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">commands = [</span><span style="color:#9ECBFF;">&quot;ui&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">scripts = [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&#39;&#39;&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">    echo &#39;&lt;%= JSON.stringify(</span></span>
<span class="line"><span style="color:#9ECBFF;">        await ui({</span></span>
<span class="line"><span style="color:#9ECBFF;">            type: &quot;input&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">            message: &#39;What is your username?&#39;,</span></span>
<span class="line"><span style="color:#9ECBFF;">            initial: &#39;jonschlinkert&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">        })</span></span>
<span class="line"><span style="color:#9ECBFF;">    ) %&gt;&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">    &#39;&#39;&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[</span><span style="color:#6F42C1;">&quot;interactive&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">commands = [</span><span style="color:#032F62;">&quot;ui&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">scripts = [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&#39;&#39;&#39;</span></span>
<span class="line"><span style="color:#032F62;">    echo &#39;&lt;%= JSON.stringify(</span></span>
<span class="line"><span style="color:#032F62;">        await ui({</span></span>
<span class="line"><span style="color:#032F62;">            type: &quot;input&quot;,</span></span>
<span class="line"><span style="color:#032F62;">            message: &#39;What is your username?&#39;,</span></span>
<span class="line"><span style="color:#032F62;">            initial: &#39;jonschlinkert&#39;</span></span>
<span class="line"><span style="color:#032F62;">        })</span></span>
<span class="line"><span style="color:#032F62;">    ) %&gt;&#39;</span></span>
<span class="line"><span style="color:#032F62;">    &#39;&#39;&#39;</span></span>
<span class="line"><span style="color:#24292E;">]</span></span></code></pre></div><h2 id="form" tabindex="-1">form <a class="header-anchor" href="#form" aria-label="Permalink to &quot;form&quot;">​</a></h2><p><img src="https://raw.githubusercontent.com/enquirer/enquirer/master/media/form-prompt.gif" alt=""></p><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">&quot;interactive&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">commands = [</span><span style="color:#9ECBFF;">&quot;ui&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">scripts = [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&#39;&#39;&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">    echo &#39;&lt;%= JSON.stringify(</span></span>
<span class="line"><span style="color:#9ECBFF;">        await ui({</span></span>
<span class="line"><span style="color:#9ECBFF;">            type: &quot;form&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">            message: &#39;Please provide the following information:&#39;,</span></span>
<span class="line"><span style="color:#9ECBFF;">            choices: [</span></span>
<span class="line"><span style="color:#9ECBFF;">                { name: &#39;firstname&#39;, message: &#39;First Name&#39;, initial: &#39;Jon&#39; },</span></span>
<span class="line"><span style="color:#9ECBFF;">                { name: &#39;lastname&#39;, message: &#39;Last Name&#39;, initial: &#39;Schlinkert&#39; },</span></span>
<span class="line"><span style="color:#9ECBFF;">                { name: &#39;username&#39;, message: &#39;GitHub username&#39;, initial: &#39;jonschlinkert&#39; }</span></span>
<span class="line"><span style="color:#9ECBFF;">            ]</span></span>
<span class="line"><span style="color:#9ECBFF;">        })</span></span>
<span class="line"><span style="color:#9ECBFF;">    ) %&gt;&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">    &#39;&#39;&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[</span><span style="color:#6F42C1;">&quot;interactive&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">commands = [</span><span style="color:#032F62;">&quot;ui&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">scripts = [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&#39;&#39;&#39;</span></span>
<span class="line"><span style="color:#032F62;">    echo &#39;&lt;%= JSON.stringify(</span></span>
<span class="line"><span style="color:#032F62;">        await ui({</span></span>
<span class="line"><span style="color:#032F62;">            type: &quot;form&quot;,</span></span>
<span class="line"><span style="color:#032F62;">            message: &#39;Please provide the following information:&#39;,</span></span>
<span class="line"><span style="color:#032F62;">            choices: [</span></span>
<span class="line"><span style="color:#032F62;">                { name: &#39;firstname&#39;, message: &#39;First Name&#39;, initial: &#39;Jon&#39; },</span></span>
<span class="line"><span style="color:#032F62;">                { name: &#39;lastname&#39;, message: &#39;Last Name&#39;, initial: &#39;Schlinkert&#39; },</span></span>
<span class="line"><span style="color:#032F62;">                { name: &#39;username&#39;, message: &#39;GitHub username&#39;, initial: &#39;jonschlinkert&#39; }</span></span>
<span class="line"><span style="color:#032F62;">            ]</span></span>
<span class="line"><span style="color:#032F62;">        })</span></span>
<span class="line"><span style="color:#032F62;">    ) %&gt;&#39;</span></span>
<span class="line"><span style="color:#032F62;">    &#39;&#39;&#39;</span></span>
<span class="line"><span style="color:#24292E;">]</span></span></code></pre></div><h2 id="camel" tabindex="-1">camel <a class="header-anchor" href="#camel" aria-label="Permalink to &quot;camel&quot;">​</a></h2><p>Alias: <code>camel</code></p><p>转换为驼峰命名 (首字母小写)</p><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">&quot;camel&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">commands = [</span><span style="color:#9ECBFF;">&quot;camel&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">scripts = [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;echo &#39;&lt;%= camel(&#39;hello world&#39;) %&gt;&#39;&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;echo &#39;&lt;%= camel(&#39;hello-world&#39;) %&gt;&#39;&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;echo &#39;&lt;%= camel(&#39;hello_world&#39;) %&gt;&#39;&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;echo &#39;&lt;%= camel(&#39;hello.world&#39;) %&gt;&#39;&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;echo &#39;&lt;%= camel(&#39;helloWorld&#39;) %&gt;&#39;&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;echo &#39;&lt;%= camel(&#39;HelloWorld&#39;) %&gt;&#39;&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[</span><span style="color:#6F42C1;">&quot;camel&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">commands = [</span><span style="color:#032F62;">&quot;camel&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">scripts = [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;echo &#39;&lt;%= camel(&#39;hello world&#39;) %&gt;&#39;&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;echo &#39;&lt;%= camel(&#39;hello-world&#39;) %&gt;&#39;&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;echo &#39;&lt;%= camel(&#39;hello_world&#39;) %&gt;&#39;&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;echo &#39;&lt;%= camel(&#39;hello.world&#39;) %&gt;&#39;&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;echo &#39;&lt;%= camel(&#39;helloWorld&#39;) %&gt;&#39;&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;echo &#39;&lt;%= camel(&#39;HelloWorld&#39;) %&gt;&#39;&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">]</span></span></code></pre></div><h2 id="hump" tabindex="-1">hump <a class="header-anchor" href="#hump" aria-label="Permalink to &quot;hump&quot;">​</a></h2><p>Alias: <code>hump</code></p><p>转换为驼峰命名 (首字母大写)</p><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">&quot;hump&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">commands = [</span><span style="color:#9ECBFF;">&quot;hump&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">scripts = [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;echo &#39;&lt;%= hump(&#39;hello world&#39;) %&gt;&#39;&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;echo &#39;&lt;%= hump(&#39;hello-world&#39;) %&gt;&#39;&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;echo &#39;&lt;%= hump(&#39;hello_world&#39;) %&gt;&#39;&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;echo &#39;&lt;%= hump(&#39;hello.world&#39;) %&gt;&#39;&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;echo &#39;&lt;%= hump(&#39;helloWorld&#39;) %&gt;&#39;&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;echo &#39;&lt;%= hump(&#39;HelloWorld&#39;) %&gt;&#39;&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[</span><span style="color:#6F42C1;">&quot;hump&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">commands = [</span><span style="color:#032F62;">&quot;hump&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">scripts = [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;echo &#39;&lt;%= hump(&#39;hello world&#39;) %&gt;&#39;&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;echo &#39;&lt;%= hump(&#39;hello-world&#39;) %&gt;&#39;&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;echo &#39;&lt;%= hump(&#39;hello_world&#39;) %&gt;&#39;&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;echo &#39;&lt;%= hump(&#39;hello.world&#39;) %&gt;&#39;&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;echo &#39;&lt;%= hump(&#39;helloWorld&#39;) %&gt;&#39;&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;echo &#39;&lt;%= hump(&#39;HelloWorld&#39;) %&gt;&#39;&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">]</span></span></code></pre></div><h2 id="hyphen" tabindex="-1">hyphen <a class="header-anchor" href="#hyphen" aria-label="Permalink to &quot;hyphen&quot;">​</a></h2><p>Alias: <code>hyphen</code></p><p>转换为中划线连字符命名</p><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">&quot;hyphen&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">commands = [</span><span style="color:#9ECBFF;">&quot;hyphen&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">scripts = [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;echo &#39;&lt;%= hyphen(&#39;hello world&#39;) %&gt;&#39;&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;echo &#39;&lt;%= hyphen(&#39;hello-world&#39;) %&gt;&#39;&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;echo &#39;&lt;%= hyphen(&#39;hello_world&#39;) %&gt;&#39;&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;echo &#39;&lt;%= hyphen(&#39;hello.world&#39;) %&gt;&#39;&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;echo &#39;&lt;%= hyphen(&#39;helloWorld&#39;) %&gt;&#39;&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;echo &#39;&lt;%= hyphen(&#39;HelloWorld&#39;) %&gt;&#39;&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[</span><span style="color:#6F42C1;">&quot;hyphen&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">commands = [</span><span style="color:#032F62;">&quot;hyphen&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">scripts = [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;echo &#39;&lt;%= hyphen(&#39;hello world&#39;) %&gt;&#39;&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;echo &#39;&lt;%= hyphen(&#39;hello-world&#39;) %&gt;&#39;&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;echo &#39;&lt;%= hyphen(&#39;hello_world&#39;) %&gt;&#39;&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;echo &#39;&lt;%= hyphen(&#39;hello.world&#39;) %&gt;&#39;&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;echo &#39;&lt;%= hyphen(&#39;helloWorld&#39;) %&gt;&#39;&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;echo &#39;&lt;%= hyphen(&#39;HelloWorld&#39;) %&gt;&#39;&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">]</span></span></code></pre></div><h2 id="underline" tabindex="-1">underline <a class="header-anchor" href="#underline" aria-label="Permalink to &quot;underline&quot;">​</a></h2><p>Alias: <code>underline</code></p><p>转换为下划线命名</p><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">&quot;underline&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">commands = [</span><span style="color:#9ECBFF;">&quot;underline&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">scripts = [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;echo &#39;&lt;%= underline(&#39;hello world&#39;) %&gt;&#39;&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;echo &#39;&lt;%= underline(&#39;hello-world&#39;) %&gt;&#39;&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;echo &#39;&lt;%= underline(&#39;hello_world&#39;) %&gt;&#39;&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;echo &#39;&lt;%= underline(&#39;hello.world&#39;) %&gt;&#39;&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;echo &#39;&lt;%= underline(&#39;helloWorld&#39;) %&gt;&#39;&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;echo &#39;&lt;%= underline(&#39;HelloWorld&#39;) %&gt;&#39;&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[</span><span style="color:#6F42C1;">&quot;underline&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">commands = [</span><span style="color:#032F62;">&quot;underline&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">scripts = [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;echo &#39;&lt;%= underline(&#39;hello world&#39;) %&gt;&#39;&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;echo &#39;&lt;%= underline(&#39;hello-world&#39;) %&gt;&#39;&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;echo &#39;&lt;%= underline(&#39;hello_world&#39;) %&gt;&#39;&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;echo &#39;&lt;%= underline(&#39;hello.world&#39;) %&gt;&#39;&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;echo &#39;&lt;%= underline(&#39;helloWorld&#39;) %&gt;&#39;&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;echo &#39;&lt;%= underline(&#39;HelloWorld&#39;) %&gt;&#39;&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">]</span></span></code></pre></div><h2 id="readjson" tabindex="-1">readJSON <a class="header-anchor" href="#readjson" aria-label="Permalink to &quot;readJSON&quot;">​</a></h2><p>Alias: <code>readJSON</code></p><p>读取 JSON 文件</p><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">&quot;readJSON&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">commands = [</span><span style="color:#9ECBFF;">&quot;read-json&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">scripts = [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&#39;&#39;&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">    echo &#39;&lt;%= JSON.stringify(</span></span>
<span class="line"><span style="color:#9ECBFF;">        readJSON(&#39;package.json&#39;)</span></span>
<span class="line"><span style="color:#9ECBFF;">    ) %&gt;&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">    &#39;&#39;&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[</span><span style="color:#6F42C1;">&quot;readJSON&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">commands = [</span><span style="color:#032F62;">&quot;read-json&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">scripts = [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&#39;&#39;&#39;</span></span>
<span class="line"><span style="color:#032F62;">    echo &#39;&lt;%= JSON.stringify(</span></span>
<span class="line"><span style="color:#032F62;">        readJSON(&#39;package.json&#39;)</span></span>
<span class="line"><span style="color:#032F62;">    ) %&gt;&#39;</span></span>
<span class="line"><span style="color:#032F62;">    &#39;&#39;&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">]</span></span></code></pre></div><h2 id="readtoml" tabindex="-1">readTOML <a class="header-anchor" href="#readtoml" aria-label="Permalink to &quot;readTOML&quot;">​</a></h2><p>Alias: <code>readTOML</code></p><p>读取 TOML 文件</p><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">&quot;readTOML&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">commands = [</span><span style="color:#9ECBFF;">&quot;read-toml&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">scripts = [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&#39;&#39;&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">    echo &#39;&lt;%= JSON.stringify(</span></span>
<span class="line"><span style="color:#9ECBFF;">        readTOML(&#39;config.toml&#39;)</span></span>
<span class="line"><span style="color:#9ECBFF;">    ) %&gt;&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">    &#39;&#39;&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[</span><span style="color:#6F42C1;">&quot;readTOML&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">commands = [</span><span style="color:#032F62;">&quot;read-toml&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">scripts = [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&#39;&#39;&#39;</span></span>
<span class="line"><span style="color:#032F62;">    echo &#39;&lt;%= JSON.stringify(</span></span>
<span class="line"><span style="color:#032F62;">        readTOML(&#39;config.toml&#39;)</span></span>
<span class="line"><span style="color:#032F62;">    ) %&gt;&#39;</span></span>
<span class="line"><span style="color:#032F62;">    &#39;&#39;&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">]</span></span></code></pre></div>`,52),e=[o];function t(c,r,i,E,y,u){return n(),a("div",null,e)}const F=s(p,[["render",t]]);export{h as __pageData,F as default};
