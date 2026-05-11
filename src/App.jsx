import { useEffect } from "react";

const legacyStyles = [
	"/legacy/public/css/style-framework/core.css",
	"/legacy/public/css/style-framework/themes.css",
	"/legacy/public/css/home.css",
	"/legacy/public/css/templates/header.css",
	"/legacy/public/css/templates/cookies.css",
	"/legacy/public/css/templates/footer.css",
];

const externalScripts = [
	"https://code.jquery.com/jquery-3.7.1.min.js",
	"https://cdn.jsdelivr.net/npm/js-cookie@3.0.5/dist/js.cookie.min.js",
	"https://kit.fontawesome.com/c092b4e18e.js",
	"https://cdn.jsdelivr.net/npm/@studio-freight/lenis",
	"https://unpkg.com/scrollreveal",
];

const legacyScripts = [
	"/legacy/public/js/templates/header.js",
	"/legacy/public/js/templates/cookies.js",
	"/legacy/public/js/templates/footer.js",
	"/legacy/public/js/home.js",
];

function loadScript(src) {
	return new Promise((resolve, reject) => {
		const script = document.createElement("script");
		script.src = src;
		script.async = false;
		script.onload = resolve;
		script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
		document.body.appendChild(script);
	});
}

async function loadLegacyScript(src) {
	const response = await fetch(src);

	if (!response.ok) {
		throw new Error(`Failed to load legacy script: ${src}`);
	}

	const script = document.createElement("script");
	script.textContent = (await response.text())
		.replaceAll("./public/", "/legacy/public/")
		.replaceAll("'public/", "'/legacy/public/")
		.replaceAll('"public/', '"/legacy/public/');
	document.body.appendChild(script);
	return script;
}

function App() {
	useEffect(() => {
		document.documentElement.lang = "pt-BR";
		document.title = "Guilherme Fortunato | Full-Stack Developer";

		const favicon =
			document.querySelector('link[rel="shortcut icon"]') ||
			document.createElement("link");
		favicon.setAttribute("rel", "shortcut icon");
		favicon.setAttribute("href", "/legacy/public/assets/favicon/favicon.ico");
		favicon.setAttribute("type", "image/x-icon");
		document.head.appendChild(favicon);

		const styleElements = legacyStyles.map((href) => {
			const link = document.createElement("link");
			link.rel = "stylesheet";
			link.href = href;
			document.head.appendChild(link);
			return link;
		});

		let isMounted = true;
		const loadedScripts = [];

		const runLegacyScripts = async () => {
			try {
				window.dataLayer = window.dataLayer || [];
				window.gtag =
					window.gtag ||
					function gtag() {
						window.dataLayer.push(arguments);
					};
				window.gtag("js", new Date());
				window.gtag("config", "G-LD0D8J3BT4");

				loadedScripts.push(
					await loadScript(
						"https://www.googletagmanager.com/gtag/js?id=G-LD0D8J3BT4",
					),
				);

				for (const src of externalScripts) {
					if (!isMounted) return;
					loadedScripts.push(await loadScript(src));
				}

				for (const src of legacyScripts) {
					if (!isMounted) return;
					loadedScripts.push(await loadLegacyScript(src));
				}
			} catch (error) {
				console.warn(error);
			}
		};

		runLegacyScripts();

		return () => {
			isMounted = false;
			styleElements.forEach((element) => element.remove());
			loadedScripts.forEach((element) => element?.remove());
		};
	}, []);

	return (
		<>
			<div className="transition-curtain"></div>
			{/* Header */}
			<header id="js-scroll-home-top">
				{" "}
				{/* class header-transparent */}
				<div className="container flex">
					<div className="header-logo w10 flex">
						<a href="./" title="Guilherme Fortunato | Full-Stack Developer">
							<img
								src="/legacy/public/assets/logo.png"
								alt="Guilherme Fortunato Machado Portfólio"
								title="Guilherme Fortunato Machado Portfólio"
								loading="lazy"
							/>
						</a>
					</div>{" "}
					{/* Logo */}
					<nav className="header-navigation navigation w80 flex">
						<ul className="flex">
							<li className="navigation-selected">
								<a
									href="#home"
									title="Home"
									js-scrolltarget="js-scroll-home-top"
									framework-language-element-key="navigation-home"
								>
									Home
								</a>
							</li>

							<li>
								<a
									href="#about-me"
									title="Sobre Mim"
									js-scrolltarget="js-scroll-about-me-text"
									framework-language-element-key="navigation-about-me"
								>
									Sobre Mim
								</a>
							</li>

							<li>
								<a
									href="#projects"
									title="Projetos"
									js-scrolltarget="js-scroll-projects-text"
									framework-language-element-key="navigation-projects"
								>
									Projetos
								</a>
							</li>

							<li>
								<a
									href="#knowledge"
									title="Conhecimento"
									js-scrolltarget="js-scroll-knowledge-text"
									framework-language-element-key="navigation-knowledge"
								>
									Conhecimento
								</a>
							</li>

							<li>
								<a
									href="#contact"
									title="Contato"
									js-scrolltarget="js-scroll-contact-text"
									framework-language-element-key="navigation-contact"
								>
									Contato
								</a>
							</li>
						</ul>
					</nav>{" "}
					{/* Navigation */}
					<div className="header-options w10 flex pos-relative">
						<div className="languages-selector">
							<button
								className="languages-select-button button"
								aria-labelledby="select button"
								aria-haspopup="listbox"
								aria-expanded="false"
								aria-controls="select-dropdown"
							>
								<span className="languages-selected-language">
									<img
										src="/legacy/public/assets/languages-icons/pt-BR.webp"
										alt="Guilherme Fortunato Developer Português BR"
										title="Guilherme Fortunato Developer Português BR"
										loading="lazy"
									/>
								</span>
								<span className="languages-select-arrow"></span>
							</button>

							<ul className="languages-select-dropdown">
								<li language="en-US">
									<img
										src="/legacy/public/assets/languages-icons/en-US.webp"
										alt="Guilherme Fortunato Developer English USA"
										title="Guilherme Fortunato Developer English USA"
										loading="lazy"
									/>
								</li>

								<li language="es-ES">
									<img
										src="/legacy/public/assets/languages-icons/es-ES.webp"
										alt="Guilherme Fortunato Español ES"
										title="Guilherme Fortunato Developer Español ES"
										loading="lazy"
									/>
								</li>

								<li language="fr-FR">
									<img
										src="/legacy/public/assets/languages-icons/fr-FR.webp"
										alt="Guilherme Fortunato Français FR"
										title="Guilherme Fortunato Developer Français FR"
										loading="lazy"
									/>
								</li>

								<li language="pt-BR">
									<img
										src="/legacy/public/assets/languages-icons/pt-BR.webp"
										alt="Guilherme Fortunato Developer Português BR"
										title="Guilherme Fortunato Developer Português BR"
										loading="lazy"
									/>
								</li>

								<li language="zh-HK">
									<img
										src="/legacy/public/assets/languages-icons/zh-HK.webp"
										alt="Guilherme Fortunato Developer åœ‹èªž HK"
										title="Guilherme Fortunato Developer åœ‹èªž HK"
										loading="lazy"
									/>
								</li>
							</ul>
						</div>{" "}
						{/* Languages Button */}
						<button id="theme-changer" className="pos-relative button w50">
							<i id="header-opt-light-theme" className="fa-solid fa-sun"></i>
							<i id="header-opt-dark-theme" className="fa-solid fa-moon"></i>
						</button>{" "}
						{/* Themes Button */}
						<button
							id="mobile-header-expand-button"
							className="pos-absolute button"
						>
							<i className="fa-solid fa-chevron-down"></i>
						</button>{" "}
						{/* Expand Header Button */}
					</div>{" "}
					{/* Options */}
				</div>{" "}
				{/* Container */}
			</header>{" "}
			{/* Header */}
			{/* Apresentation Section */}
			<section className="apresentation">
				<div className="container flex pad40">
					<div className="apresentation-text w60">
						<h2 framework-language-element-key="apresentation-text-h2">
							Olá, eu sou o <strong>Guilherme Fortunato</strong>
						</h2>

						<p framework-language-element-key="apresentation-text-p">
							Um garoto que <span>transforma</span> linhas de código em{" "}
							<span>soluções inovadoras.</span>
						</p>

						<div className="apresentation-social_media">
							<a
								href="https://www.linkedin.com/in/guilherme-fortunato-machado/"
								target="_blank"
								title="LinkedIn"
							>
								<i className="fa-brands fa-linkedin"></i>
							</a>

							<a
								href="https://wa.me/+5541996954380?text=Olá%20Guilherme,%20vi%20seu%20portfólio%20e%20gostaria%20de%20conversar%20sobre%20uma%20oportunidade."
								target="_blank"
								title="Whatsapp"
							>
								<i className="fa-brands fa-whatsapp"></i>
							</a>

							<a
								href="https://www.github.com/guifm-dev"
								target="_blank"
								title="Github"
							>
								<i className="fa-brands fa-github"></i>
							</a>

							<a
								href="https://stackoverflow.com/users/18816701/guilherme"
								target="_blank"
								title="Stack Overflow"
							>
								<i className="fa-brands fa-stack-overflow"></i>
							</a>

							<a
								href="mailto:guilhermefortunatopr@gmail.com?subject=Vamos%20Falar%20Sobre%20Negócios&body=Olá%20Guilherme..."
								target="_blank"
								framework-language-element-key="email-contact-link"
								framework-language-contact-link="true"
								title="E-mail"
							>
								<i className="fa-solid fa-envelope"></i>
							</a>
						</div>
					</div>{" "}
					{/* Apresentation */}
					<div className="apresentation-image w40 flex-column">
						<img
							src="/legacy/public/assets/gui-photo-1-bg.jpg"
							alt="Guilherme Fortunato Desenvolvedor"
							title="Guilherme Fortunato Desenvolvedor"
							loading="lazy"
						/>

						<h3 framework-language-element-key="apresentation-fullstack">
							Desenvolvedor FullStack Web
						</h3>
					</div>{" "}
					{/* Gui Image */}
				</div>{" "}
				{/* Container */}
			</section>{" "}
			{/* Apresentation */}
			{/* End To End Applications Section */}
			<section className="end-to-end-applications pos-relative">
				<div className="end-to-end-applications_bg pos-relative">
					<div className="app-bg_opacity"></div>
					<div className="app-bg_image"></div>
				</div>{" "}
				{/* Section Background */}
				<div className="container">
					<h2
						className="w100 center-element title-text"
						id="end-to-end-applications-text-animation"
						framework-language-element-key="end-to-end-applications-text"
					>
						Aplicações criadas e desenvolvidas de
						<br />
						<span>Ponta a Ponta</span>
					</h2>
				</div>
			</section>{" "}
			{/* End To End Applications */}
			{/* About Me Section */}
			<section className="about-me flex">
				{" "}
				{/* About Me */}
				<div className="container">
					<div className="about-me_image">
						<img
							src="/legacy/public/assets/gui-photo-2-bg.png"
							alt="Guilherme Fortunato Developer"
							title="Guilherme Fortunato Developer"
							loading="lazy"
						/>
					</div>{" "}
					{/* About Me Image */}
					<div className="about-me_text pad20">
						<h2
							id="js-scroll-about-me-text"
							framework-language-element-key="about-me-title"
						>
							Sobre Mim
						</h2>

						<p framework-language-element-key="about-me-text">
							Olá! Meu nome é Guilherme Fortunato Machado, tenho{" "}
							<strong>18 anos</strong> e sou
							<strong>Desenvolvedor Web FullStack</strong> com experiência
							prática em projetos em produção e freelances. Desenvolvo
							aplicações modernas utilizando{" "}
							<strong>JavaScript e TypeScript</strong>, atuando no front-end e
							no back-end com tecnologias como{" "}
							<strong>React, Next.js, Node.js, Deno e APIs REST/GraphQL</strong>
							, focando na construção de soluções escaláveis e bem estruturadas.
							Tenho experiência com <strong>MongoDB, MySQL e PostgreSQL</strong>
							, além de ferramentas e práticas como{" "}
							<strong>
								Git/GitHub, Docker, testes E2E com Cypress, Clean Architecture e
								DDD
							</strong>
							. Tenho interesse em{" "}
							<strong>projetos e oportunidades FullStack ou Mobile</strong> que
							envolvam desenvolvimento de produtos e resolução de problemas
							reais.
						</p>
					</div>{" "}
					{/* About Me Text */}
				</div>{" "}
				{/* Container */}
			</section>{" "}
			{/* About Me */}
			{/* Projects Section */}
			<section className="projects">
				{" "}
				{/* Projects */}
				<div className="container pad40">
					<h2
						id="js-scroll-projects-text"
						framework-language-element-key="projects-title"
					>
						Projetos
					</h2>
					<div className="projects-wrapper flex-column pad30">
						<div
							className="projects-single flex pad20"
							data-project-info-title="Prime Assessoria Imobiliária"
							data-project-info-image="/legacy/public/assets/projects-images/prime_assessoria/image2.webp"
							data-project-info-tags="Website - Dashboard - Geração de PDF"
							data-project-info-description="Desenvolvido um site complexo com <b>Painel de Controle</b> e entre outras funcionalidades que agilizaram em até <b>100%</b> os processos e resultados da empresa, as principais tecnologias e bibliotecas utilizadas foram <b>Front-End</b> usando <b>JQuery e Bootstrap</b> como bibliotecas, <b>Back-End</b> usando <b>FPDF (Gerador de PDF) e PHPMailer (Envia E-mails)</b> como bibliotecas e <b>Banco de Dados MySQL</b> para armazenar todas as informações de clientes, processos e etc.
					<br/>
					Também foi desenvolvido um <b>Sistema de Backup</b> para o Banco de Dados por segurança caso tenha algum problema que afete os dados."
							data-project-info-technologies="
						fa-brands fa-html5|
						fa-brands fa-css3|
						fa-brands fa-square-js|
						fa-brands fa-bootstrap|
						fa-brands fa-php|
						fa-solid fa-database
					"
							data-project-info-deploy-link="https://www.caixaaquiprime.com.br/inicio/"
							data-project-info-repository-link="null"
							framework-language-element-key="projects-modal-single-prime_consultancy"
						>
							<div className="projects-single-image w45">
								<img
									src="/legacy/public/assets/projects-images/prime_assessoria/image1.webp"
									alt="Project Image"
									title="Project Image"
									loading="lazy"
								/>
							</div>

							<div className="projects-single-text w55 pad20">
								<h2 framework-language-element-key="projects-single-prime_consultancy-title">
									Prime Assessoria Imobiliária - 2022
								</h2>
								<p framework-language-element-key="projects-single-prime_consultancy-description">
									Desenvolvido um site Corporativo, com sistema de painel de
									controle para os funcionários, geração de relatórios em PDF e
									salvamento de documentos no banco de dados. As tecnologias
									usadas foram{" "}
									<b>
										Front-End (HTML5, CSS3, JavaScript), Bootstrap, PHP e Banco
										de Dados MySQL
									</b>
									.
								</p>

								<a
									href="#project-info"
									className="modal-toggle"
									modal-target="#project-info-modal"
									framework-language-element-key="more-about-text"
									title="Saiba Mais"
								>
									Saiba Mais
								</a>
							</div>
						</div>{" "}
						{/* Projects Single */}
						<div
							className="projects-single flex pad20"
							data-project-info-title="Work No Break"
							data-project-info-image="/legacy/public/assets/projects-images/work_no_break/image2.webp"
							data-project-info-tags="Website - API - Contratação de Serviços"
							data-project-info-description="O site foi desenvolvido usando <b>Vanilla HTML5, CSS3 e jQuery</b>, o design foi criado no <b>Figma</b> e foi utilizado <b>Firebase</b> como servidor principal do projeto, meu trabalho foi <b>desenvolver o Front-End e conectá-lo à API que já estava pronta para ser utilizada</b>.<br/>Através do site o cliente também consegue acessar a página do cliente que mostra os serviços em andamento e outras informações.<br/>Também foi utilizada a API do Google Maps para busca de endereço (cidade e bairro).<br/>O site não utiliza nenhum tipo de framework ou coisa do tipo, <b>tudo feito à mão.</b>"
							data-project-info-technologies="
					fa-brands fa-html5|
					fa-brands fa-css3|
					fa-brands fa-square-js|
					fa-brands fa-figma
					"
							data-project-info-deploy-link="https://worknobreak.com.br/"
							data-project-info-repository-link="null"
							framework-language-element-key="projects-modal-single-my_job"
						>
							<div className="projects-single-image w45">
								<img
									src="/legacy/public/assets/projects-images/work_no_break/image1.webp"
									alt="Project Image"
									title="Project Image"
									loading="lazy"
								/>
							</div>

							<div className="projects-single-text w55 pad20">
								<h2 framework-language-element-key="projects-single-my_job-title">
									Work No Break - 2024
								</h2>
								<p framework-language-element-key="projects-single-my_job-description">
									Contratado para desenvolver o Front-End de um site de
									prestação de serviços, onde o cliente pode acessá-lo,{" "}
									<b>criar sua conta</b> e solicitar diversos tipos de serviços.
									<br />O cliente também pode{" "}
									<b>escolher qual profissional irá realizar o serviço</b>,
									mostrando foto, localização e feedback do mesmo, o site está{" "}
									<b>disponível para mais de 15 idiomas</b>e é simples e fácil
									de usar.
								</p>

								<a
									href="#project-info"
									className="modal-toggle"
									modal-target="#project-info-modal"
									framework-language-element-key="more-about-text"
									title="Saiba Mais"
								>
									Saiba Mais
								</a>
							</div>
						</div>{" "}
						{/* Projects Single */}
						<div
							className="projects-single flex pad20"
							data-project-info-title="Estação Meteorológica"
							data-project-info-image="/legacy/public/assets/projects-images/estacao_meteorologica/image2.webp"
							data-project-info-tags="Aplicativo - React Native - Planilhas no Excel"
							data-project-info-description="Um projeto social da minha escola que se chamava <b>Estação Meteorológica</b> precisava ter <b>mais agilidade no processo de anotação</b> dos dados da estação, e então fui chamado para <b>desenvolver esse aplicativo</b> para que os alunos que fizessem parte do projeto pudessem fazer as <b>anotações e exportá-las</b> de forma <b>100x mais rápida.</b>"
							data-project-info-technologies="
					fa-brands fa-react|
					fa-brands fa-square-js
				"
							data-project-info-deploy-link="https://estacao-meteorologica-szy.web.app/"
							data-project-info-repository-link="https://github.com/guifm-dev/Estacao-Meteorologica-App"
							framework-language-element-key="projects-modal-single-weather_station"
						>
							<div className="projects-single-image w45">
								<img
									src="/legacy/public/assets/projects-images/estacao_meteorologica/image1.webp"
									alt="Project Image"
									title="Project Image"
									loading="lazy"
								/>
							</div>

							<div className="projects-single-text w55 pad20">
								<h2 framework-language-element-key="projects-single-weather_station-title">
									Estação Meteorológica - 2024
								</h2>
								<p framework-language-element-key="projects-single-weather_station-description">
									Aplicativo para <b>IOs e Android</b> onde é possível fazer{" "}
									<b>anotações do clima atual da região</b> e exportá-lo para
									uma <b>planilha no excel</b>, todas as anotações (Temperatura,
									Direção do vento, Raios UV) são armazenados em um banco de
									dados do
									<b>Firebase</b>, futuramente será possível gerar gráficos no
									excel com os dados armazenados.
								</p>

								<a
									href="#project-info"
									className="modal-toggle"
									modal-target="#project-info-modal"
									framework-language-element-key="more-about-text"
									title="Saiba Mais"
								>
									Saiba Mais
								</a>
							</div>
						</div>{" "}
						{/* Projects Single */}
						<div
							className="projects-single flex pad20"
							data-project-info-title="RBI Web"
							data-project-info-image="/legacy/public/assets/projects-images/rbi_web/image2.webp"
							data-project-info-tags="Website - Barbearia - Divulgação de Serviços"
							data-project-info-description="Site estático, voltado para vendas e para que o <b>cliente conheça mais sobre a barbearia.</b><br/>O dono da barbearia conseguiu ter um controle <b>7x</b> maior dos clientes que faziam agendamentos, também fez com que o cliente conhecesse o trabalho do barbeiro, <b>levando assim a um agendamento.</b>"
							data-project-info-technologies="
					fa-brands fa-html5|
					fa-brands fa-css3|
					fa-brands fa-square-js
				"
							data-project-info-deploy-link="null"
							data-project-info-repository-link="https://github.com/guifm-dev/rbi-web"
							framework-language-element-key="projects-modal-single-rbi_web"
						>
							<div className="projects-single-image w45">
								<img
									src="/legacy/public/assets/projects-images/rbi_web/image1.webp"
									alt="Project Image"
									title="Project Image"
									loading="lazy"
								/>
							</div>

							<div className="projects-single-text w55 pad20">
								<h2 framework-language-element-key="projects-single-rbi_web-title">
									RBI Web - 2023
								</h2>
								<p framework-language-element-key="projects-single-rbi_web-description">
									<b>Landing Page</b> desenvolvida para uma barbearia que
									frequento, usada principalmente para divulgar os serviços que
									a barbearia oferece, o{" "}
									<b>
										cliente também pode localizar e saber onde ficam as unidades
									</b>{" "}
									da barbearia.
								</p>

								<a
									href="#project-info"
									className="modal-toggle"
									modal-target="#project-info-modal"
									framework-language-element-key="more-about-text"
									title="Saiba Mais"
								>
									Saiba Mais
								</a>
							</div>
						</div>{" "}
						{/* Projects Single */}
						<div
							className="projects-single flex pad20"
							data-project-info-title="RBI App"
							data-project-info-image="/legacy/public/assets/projects-images/rbi_app/image2.webp"
							data-project-info-tags="Mobile - Barbearia - Gestão de Negócio"
							data-project-info-description="Desenvolvido e criado com o poderoso <b>React Native</b> juntamente com a tecnologia do <b>Expo</b>, atualmente o projeto foi <b>descontinuado</b> mas pode ser facilmente adaptado e vendido para outras barbearias.<br/>Através do aplicativo o dono da barbearia tinha o controle dos seus estabelecimentos, <b>aumentando a produtividade em até 21x</b>, além de que todo agendamento feito pelo site aparece no aplicativo, <b>esses e diversos outros problemas foram resolvidos através do aplicativo e do site.</b>"
							data-project-info-technologies="
						fa-brands fa-react|
						fa-brands fa-square-js
					"
							data-project-info-deploy-link="null"
							data-project-info-repository-link="https://github.com/guifm-dev/rbi-app"
							framework-language-element-key="projects-modal-single-rbi_app"
						>
							<div className="projects-single-image w45">
								<img
									src="/legacy/public/assets/projects-images/rbi_app/image1.webp"
									alt="Project Image"
									title="Project Image"
									loading="lazy"
								/>
							</div>

							<div className="projects-single-text w55 pad20">
								<h2 framework-language-element-key="projects-single-rbi_app-title">
									RBI App - 2023
								</h2>
								<p framework-language-element-key="projects-single-rbi_app-description">
									Aplicativo mobile desenvolvido para complementar a{" "}
									<b>versão Web (RBI Web)</b>, feito especificamente para{" "}
									<b>barbearias</b>, onde é possível ver os{" "}
									<b>horários de hoje, agenda, controle de funcionários</b> e
									etc.
								</p>

								<a
									href="#project-info"
									className="modal-toggle"
									modal-target="#project-info-modal"
									framework-language-element-key="more-about-text"
									title="Saiba Mais"
								>
									Saiba Mais
								</a>
							</div>
						</div>{" "}
						{/* Projects Single */}
						<div
							className="projects-single flex pad20"
							data-project-info-title="Igreja IBCA App"
							data-project-info-image="/legacy/public/assets/projects-images/ibca_church_app/image1.webp"
							data-project-info-tags="Aplicativo - Controle de Informações - Datas e Anotações Dinâmicas"
							data-project-info-description="Um aplicativo criado para a igreja em que frequento, desenvolvido principalmente para ter como anotação as datas e eventos da igreja, também podendo se registrar membros que estão participando do <b>Grupo de Jovens</b> da igreja, desenvolvido tudo em <b>React Native</b> utilizando a plataforma do <b>Expo</b> para se exportar o aplicativo para <b>Android e IOS</b>."
							data-project-info-technologies="
						fa-brands fa-square-js|
						fa-brands fa-react
					"
							data-project-info-deploy-link="null"
							data-project-info-repository-link="null"
							framework-language-element-key="projects-modal-single-ibca_church"
						>
							<div className="projects-single-image w45">
								<img
									src="/legacy/public/assets/projects-images/ibca_church_app/image1.webp"
									alt="Project Image"
									title="Project Image"
									loading="lazy"
								/>
							</div>

							<div className="projects-single-text w55 pad20">
								<h2 framework-language-element-key="projects-single-ibca_church-title">
									Igreja IBCA App - 2022
								</h2>
								<p framework-language-element-key="projects-single-ibca_church-description">
									Criado um aplicativo para a minha igreja, usando{" "}
									<b>React Native e a plataforma do Expo</b>
									para exportação do aplicativo para <b>IOS & Android</b>.
								</p>

								<a
									href="#project-info"
									className="modal-toggle"
									modal-target="#project-info-modal"
									framework-language-element-key="more-about-text"
									title="Saiba Mais"
								>
									Saiba Mais
								</a>
							</div>
						</div>{" "}
						{/* Projects Single */}
						<div
							className="projects-single flex pad20"
							data-project-info-title="Agência Digital"
							data-project-info-image="/legacy/public/assets/projects-images/digital_agency/image2.webp"
							data-project-info-tags="Voltado Para Vendas - Estático"
							data-project-info-description="Template básico mas que funciona muito bem para <b>captar mais clientes e empresas</b> para <b>fecharem negócio com sua agência.</b>"
							data-project-info-technologies="
						fa-brands fa-html5|
						fa-brands fa-css3
					"
							data-project-info-deploy-link="null"
							data-project-info-repository-link="https://github.com/guifm-dev/projeto-11-agencia"
							framework-language-element-key="projects-modal-single-digital_agency"
						>
							<div className="projects-single-image w45">
								<img
									src="/legacy/public/assets/projects-images/digital_agency/image1.webp"
									alt="Project Image"
									title="Project Image"
									loading="lazy"
								/>
							</div>

							<div className="projects-single-text w55 pad20">
								<h2 framework-language-element-key="projects-single-digital_agency-title">
									Agência Digital - 2022
								</h2>
								<p framework-language-element-key="projects-single-digital_agency-description">
									Pequeno projeto desenvolvido como modelo para ser vendido para
									outras <b>agências digitais</b> que queiram atingir mais
									clientes.
								</p>

								<a
									href="#project-info"
									className="modal-toggle"
									modal-target="#project-info-modal"
									framework-language-element-key="more-about-text"
									title="Saiba Mais"
								>
									Saiba Mais
								</a>
							</div>
						</div>{" "}
						{/* Projects Single */}
						<div
							className="projects-single flex pad20"
							data-project-info-title="Odontologia"
							data-project-info-image="/legacy/public/assets/projects-images/dentist/image2.webp"
							data-project-info-tags="Website - Estático"
							data-project-info-description="Outro projeto que também foi desenvolvido e veio do curso de <b>Front-End Webmaster</b> da <b>Danki Code</b> mas que também pode ser facilmente adaptado e criado novas variações do site que podem ser vendidas para <b>Odontologias</b>, criado usando <b>Vanilla HTML5 e CSS3</b>.<br/>O site serve para <b>demonstrar o trabalho da Odontologia</b>, ele <b>pode ser atualizado e implementado um painel que mostra as consultas do dia para os dentistas.</b>"
							data-project-info-technologies="
						fa-brands fa-html5|
						fa-brands fa-css3
					"
							data-project-info-deploy-link="null"
							data-project-info-repository-link="https://github.com/guifm-dev/projeto-10-dentista-2"
							framework-language-element-key="projects-modal-single-dentistry"
						>
							<div className="projects-single-image w45">
								<img
									src="/legacy/public/assets/projects-images/dentist/image1.webp"
									alt="Project Image"
									title="Project Image"
									loading="lazy"
								/>
							</div>

							<div className="projects-single-text w55 pad20">
								<h2 framework-language-element-key="projects-single-dentistry-title">
									Dentista/Odontologia - 2023
								</h2>
								<p framework-language-element-key="projects-single-dentistry-description">
									Um site mostrando o trabalho de uma odontologia, criado com{" "}
									<b>Vanilla HTML 5 & CSS 3</b>.
								</p>

								<a
									href="#project-info"
									className="modal-toggle"
									modal-target="#project-info-modal"
									framework-language-element-key="more-about-text"
									title="Saiba Mais"
								>
									Saiba Mais
								</a>
							</div>
						</div>{" "}
						{/* Projects Single */}
						<div className="projects-more-button">
							<h3 framework-language-element-key="projects-more-button">
								Mais Projetos
							</h3>

							<i
								id="projects-more-button"
								className="fa-solid fa-chevron-down"
							></i>
						</div>
					</div>{" "}
					{/* Projects Wrapper */}
				</div>{" "}
				{/* Container */}
			</section>{" "}
			{/* Projects */}
			{/* Knowledge Section */}
			<section className="knowledge pad20">
				{" "}
				{/* Knowledge */}
				<h2
					id="js-scroll-knowledge-text"
					framework-language-element-key="knowledge-title"
				>
					Meu Conhecimento
				</h2>
				<div className="container flex pad20" id="knowledge-container">
					<div className="knowledge-left-side flex">
						<div className="technologies-list-container w50 flex-column pad20">
							<div className="technologies-single-box pad10 flex">
								<i className="fa-brands fa-js"></i>
								<h2>JavaScript</h2>
							</div>

							<div className="technologies-single-box pad10 flex">
								<i className="fa-solid fa-code"></i>
								<h2>TypeScript</h2>
							</div>

							<div className="technologies-single-box pad10 flex">
								<i className="fa-brands fa-react"></i>
								<h2>React</h2>
							</div>

							<div className="technologies-single-box pad10 flex">
								<i className="fa-solid fa-layer-group"></i>
								<h2>Next.js</h2>
							</div>

							<div className="technologies-single-box pad10 flex">
								<i className="fa-brands fa-node-js"></i>
								<h2>Node.js</h2>
							</div>

							<div className="technologies-single-box pad10 flex">
								<i className="fa-brands fa-php"></i>
								<h2>PHP</h2>
							</div>

							<div className="technologies-single-box pad10 flex">
								<i className="fa-solid fa-diagram-project"></i>
								<h2>REST / GraphQL APIs</h2>
							</div>

							<div className="technologies-single-box pad10 flex">
								<i className="fa-solid fa-database"></i>
								<h2>MongoDB</h2>
							</div>

							<div className="technologies-single-box pad10 flex">
								<i className="fa-solid fa-database"></i>
								<h2>MySQL</h2>
							</div>

							<div className="technologies-single-box pad10 flex">
								<i className="fa-solid fa-database"></i>
								<h2>PostgreSQL</h2>
							</div>

							<div className="technologies-single-box pad10 flex">
								<i className="fa-brands fa-git-alt"></i>
								<h2>Git / GitHub</h2>
							</div>

							<div className="technologies-single-box pad10 flex">
								<i className="fa-brands fa-docker"></i>
								<h2>Docker</h2>
							</div>

							<div className="technologies-more-button">
								<button
									className="button flex pad10 knowledge-modal-toggle"
									id="modal-toggle"
									modal-target="#knowledge-modal"
									framework-language-element-key="knowledge-modal-button"
								>
									Mais Sobre Meu Conhecimento
									<i className="fa-solid fa-plus"></i>
								</button>
							</div>
						</div>{" "}
						{/* Technologies List Container */}
						<div className="technologies-right flex-column w50 pad20">
							<div className="technologies-dynamic-icon flex pad40">
								<i
									id="technologies-dynamic-icon-element"
									className="fa-brands fa-js"
								></i>
							</div>{" "}
							{/* Technologies Dynamic Icon */}
							<h3
								framework-language-element-key="soft-skills-title"
								className="swipe-to-soft-skills-text"
							>
								Soft Skills
							</h3>
							<i
								id="knowledge-swipe-to-soft-skills"
								className="fa-solid fa-arrow-right-long swipe-to-soft-skills-button"
							></i>
						</div>{" "}
						{/* Technologies Right */}
					</div>{" "}
					{/* Knowledge Left Side */}
					<div className="knowledge-right-side pos-relative">
						<i
							id="knowledge-swipe-to-technologies"
							className="fa-solid fa-arrow-left-long knowledge-swipe-to-technologies-button"
						></i>
						<h3 framework-language-element-key="soft-skills-title">
							Soft Skills
						</h3>
						<div className="soft-skills-wrapper">
							{/* Fast Learning */}
							<div className="soft-skill-single">
								<i className="fa-solid fa-book"></i>

								<h3 framework-language-element-key="soft-skills-fast_learning-title">
									Aprendizado Rápido
								</h3>

								<p framework-language-element-key="soft-skills-fast_learning-description">
									Assim como tenho autonomia e fácil adaptação, minha curva de
									aprendizado é rápida, constante e exponencial.
								</p>
							</div>

							{/* Team Work */}
							<div className="soft-skill-single">
								<i className="fa-solid fa-people-group"></i>

								<h3 framework-language-element-key="soft-skills-team_work-title">
									Trabalho em Equipe
								</h3>

								<p framework-language-element-key="soft-skills-team_work-description">
									Amo trabalhar em equipe e aprender com os colegas, evoluir
									junto com eles e vê-los no sucesso junto comigo é uma missão e
									um sonho.
								</p>
							</div>

							{/* Clean and Organized */}
							<div className="soft-skill-single">
								<i className="fa-solid fa-leaf"></i>

								<h3 framework-language-element-key="soft-skills-clean_organized-title">
									Ambiente de Trabalho Limpo e Organizado
								</h3>

								<p framework-language-element-key="soft-skills-clean_organized-description">
									Sou um homem extremamente organizado e que tem TOC ao ver algo
									fora do lugar ou alguma coisa suja, isso é uma regra para mim.
								</p>
							</div>

							{/* Autonomy */}
							<div className="soft-skill-single">
								<i className="fa-solid fa-rocket"></i>

								<h3 framework-language-element-key="soft-skills-autonomy-title">
									Autonomia para resolver Problemas
								</h3>

								<p framework-language-element-key="soft-skills-autonomy-description">
									Se necessário vou até as profundezas da internet para achar a
									solução de um problema nas aplicações que desenvolvo, não
									consigo dormir sem ter resolvido um bug antes e com certeza
									não dependo de outros desenvolvedores para fazer isso.
								</p>
							</div>

							{/* Respect & Empathy */}
							<div className="soft-skill-single">
								<i className="fa-solid fa-face-smile"></i>

								<h3 framework-language-element-key="soft-skills-respect_empathy-title">
									Empatia e Respeito
								</h3>

								<p framework-language-element-key="soft-skills-respect_empathy-description">
									Amar ao próximo e respeitá-lo independente das diferenças é um
									princípio para mim já que, â€œRespeito gera respeitoâ€œ.
								</p>
							</div>

							{/* Communication */}
							<div className="soft-skill-single">
								<i className="fa-regular fa-comments"></i>

								<h3 framework-language-element-key="soft-skills-communication-title">
									Comunicação
								</h3>

								<p framework-language-element-key="soft-skills-communication-description">
									Nos últimos anos venho focando em evoluir minha comunicação
									com as pessoas, e isso tem me dado resultados incríveis. A
									arte de se comunicar é linda.
								</p>
							</div>

							{/* Proactivity & Focus */}
							<div className="soft-skill-single">
								<i className="fa-solid fa-location-crosshairs"></i>

								<h3 framework-language-element-key="soft-skills-proactivity_focus-title">
									Proatividade e Foco
								</h3>

								<p framework-language-element-key="soft-skills-proactivity_focus-description">
									Sempre estou me movimentando e fazendo algo, e quando estou
									parado me pergunto o por quê disso, e logo após isso volto ao
									foco.
								</p>
							</div>

							{/* Resilience */}
							<div className="soft-skill-single">
								<i className="fa-solid fa-shield-halved"></i>

								<h3 framework-language-element-key="soft-skills-resilience-title">
									Resiliência
								</h3>

								<p framework-language-element-key="soft-skills-resilience-description">
									A grande maioria das pessoas costuma desistir na primeira
									dificuldade que aparece no meio do caminho, mas eu vou além,
									desistir não é uma opção para mim. Isso me faz diferente, isso
									me faz melhor.
								</p>
							</div>

							{/* Flexibility & Adaptation */}
							<div className="soft-skill-single">
								<i className="fa-solid fa-sitemap"></i>

								<h3 framework-language-element-key="soft-skills-flexibility_adaptation-title">
									Flexibilidade e Capacidade de Adaptação
								</h3>

								<p framework-language-element-key="soft-skills-flexibility_adaptation-description">
									Sou flexível e costumo me adaptar facilmente às novas
									tecnologias e às novas tendências do mercado ao redor do
									mundo.
								</p>
							</div>
						</div>{" "}
						{/* Soft Skills Wrapper */}
					</div>{" "}
					{/* Knowledge Right Side */}
				</div>{" "}
				{/* Container */}
			</section>{" "}
			{/* Knowledge */}
			{/* Contact Section */}
			<section className="contact">
				{" "}
				{/* Contact */}
				<div className="container pad50 flex-column">
					<div className="contact-bg_opacity"></div>

					<h2
						id="js-scroll-contact-text"
						framework-language-element-key="contact-call-to-action-text"
					>
						Vamos Conversar?
						<br />
						Me mande um e-mail e<br />
						<strong>
							<a
								href="mailto:guilhermefortunatopr@gmail.com?subject=Vamos%20Falar%20Sobre%20Negócios&body=Olá%20Guilherme..."
								target="_blank"
								title="Entre Em Contato Comigo"
							>
								Entre Em Contato Comigo.
							</a>
						</strong>
					</h2>
				</div>{" "}
				{/* Container */}
			</section>{" "}
			{/* Contact */}
			{/*-------------------------------------*/}
			{/*-------------------------------------*/}
			{/* Modals */}
			{/* Project Single Image Expanded (Custom Modal) */}
			<div
				className="project-image-expanded-container flex pad10 text-center w100"
				data-lenis-prevent
			>
				<div className="project-image-expanded-wrapper flex">
					<button className="button project-image-expanded-close pos-absolute">
						<i className="fa-solid fa-x"></i>
					</button>

					<img
						id="projectImageExpanded"
						src="/legacy/public/assets/logo-2.png"
						alt="Project Image Expanded"
						title="Project Image Expanded"
						loading="lazy"
					/>
				</div>
			</div>{" "}
			{/* Project Single Image Expanded */}
			{/* Project Info Modal */}
			<div
				className="modal w100 pad10"
				id="project-info-modal"
				data-lenis-prevent
			>
				<div className="container flex-column w85 pos-relative">
					<button className="button modal-close">
						<i className="fa-solid fa-x"></i>
					</button>
					<h2 className="modal-title w100 text-center">$PROJECT_TITLE</h2>
					<div className="project-info-modal-content w100 flex pad10">
						<div className="project-info-modal-image project-info-modal-div w35">
							<img
								src="/legacy/public/assets/logo-2.png"
								alt="Project Image"
								title="Project Image"
								loading="lazy"
								className="project-info-modal-image-img"
							/>
						</div>{" "}
						{/* Project Info Image */}
						<div className="project-info-modal-text project-info-modal-div w65 flex-column ">
							<h2 className="project-info-modal-text-tags">$PROJECT_TAGS</h2>
							<p className="project-info-modal-text-description">
								$PROJECT_DESCRIPTION
							</p>
						</div>{" "}
						{/* Project Info Text */}
						<div className="project-info-modal-technologies project-info-modal-div w100 flex"></div>{" "}
						{/* Project Info Technologies */}
						<div className="project-info-modal-footer-buttons project-info-modal-div w100 flex">
							<a
								href="#project-info-deployed"
								target="_self"
								title="Projeto no Ar"
								className="project-info-modal-button project-info-modal-button-deployed ahref-disabled"
								framework-language-element-key="projects-modal-button-deployed"
							>
								Projeto no Ar
							</a>

							<a
								href="#project-info-repository"
								target="_self"
								title="Repositório no Github"
								className="project-info-modal-button project-info-modal-button-repository ahref-disabled"
								framework-language-element-key="projects-modal-button-repository"
							>
								Repositório no Github
							</a>
						</div>{" "}
						{/* Project Info Footer */}
					</div>{" "}
					{/* Project Info Modal Content */}
				</div>{" "}
				{/* Modal Project Info Container */}
			</div>{" "}
			{/* Project Info Modal */}
			{/* Knowledge Modal*/}
			<div className="modal w100 pad10" id="knowledge-modal" data-lenis-prevent>
				<div className="container flex-column w85 pos-relative">
					<button className="button modal-close">
						<i className="fa-solid fa-x"></i>
					</button>
					<h2
						className="modal-title w100 text-center"
						framework-language-element-key="knowledge-title"
					>
						Meu Conhecimento
					</h2>
					{/* Courses */}
					<div className="modal-knowledge modal-knowledge-courses flex">
						<h3
							className="modal-knowledge-subtitle"
							framework-language-element-key="knowledge-modal-subtitle-courses"
						>
							Cursos & Formação
						</h3>
						{/* Modal Box Single */}
						<div className="modal-knowledge-box-single">
							<div className="modal-knowledge-box-single-image">
								<img
									src="https://muraldoparana.com.br/wp-content/uploads/2020/03/96-logo-uninter-horizontal-1805x795.jpg"
									alt="Guilherme Fortunato Engenharia de Software"
									title="Guilherme Fortunato Engenharia de Software"
									loading="lazy"
								/>
							</div>{" "}
							{/* Image */}
							<div className="modal-knowledge-box-single-text">
								<h3 framework-language-element-key="knowledge-modal-formation-eng_software-title">
									Engenharia de Software - Uninter - 2030
								</h3>

								<hr className="hr-horizontal" />

								<p framework-language-element-key="knowledge-modal-formation-eng_software-description">
									Ingressei na Uninter para cursar Engenharia de Software na
									modalidade EAD, com previsão de conclusão para 2030.
								</p>
							</div>{" "}
							{/* Text */}
						</div>{" "}
						{/* Modal Box Single */}
						{/* Modal Box Single */}
						<div className="modal-knowledge-box-single">
							<div className="modal-knowledge-box-single-image">
								<img
									src="https://www.sistemapoliedro.com.br/app/uploads/2020/11/Novo-Ensino-Medio.v2-1024x518-1.jpg"
									alt="Guilherme Fortunato Novo Ensino Médio School"
									title="Guilherme Fortunato Novo Ensino Médio School"
									loading="lazy"
								/>
							</div>{" "}
							{/* Image */}
							<div className="modal-knowledge-box-single-text">
								<h3 framework-language-element-key="knowledge-modal-courses-high_school-title">
									Análise e Desenvolvimento de Sistemas - Novo Ensino Médio -
									2025
								</h3>

								<hr className="hr-horizontal" />

								<p framework-language-element-key="knowledge-modal-courses-high_school-description">
									Me formei no Novo Ensino Médio cursando o técnico em{" "}
									<b>Análise e Desenvolvimento de Sistemas</b> que teve uma
									duração total de 3 anos.
								</p>
							</div>{" "}
							{/* Text */}
						</div>{" "}
						{/* Modal Box Single */}
						{/* Modal Box Single */}
						<div className="modal-knowledge-box-single">
							<div className="modal-knowledge-box-single-image">
								<img
									src="https://danki.thecode.com.br/wp-content/uploads/2023/02/cover-1200x675-1.png"
									alt="Guilherme Fortunato Danki Code Course"
									title="Guilherme Fortunato Danki Code Course"
									loading="lazy"
								/>
							</div>{" "}
							{/* Image */}
							<div className="modal-knowledge-box-single-text">
								<h3 framework-language-element-key="knowledge-modal-courses-dankicode-title">
									FullStack Master - Danki Code - 2026
								</h3>

								<hr className="hr-horizontal" />

								<p framework-language-element-key="knowledge-modal-courses-dankicode-description">
									Pacote FullStack Master da Danki Code onde dentro dele possuem{" "}
									<b>mais de 25 cursos</b> te preparando pra ser um verdadeiro
									desenvolvedor web, grande parte do meu conhecimento web veio
									de lá.
								</p>
							</div>{" "}
							{/* Text */}
						</div>{" "}
						{/* Modal Box Single */}
						{/* Modal Box Single */}
						<div className="modal-knowledge-box-single">
							<div className="modal-knowledge-box-single-image">
								<img
									src="https://www.alura.com.br/assets/img/aluraverso/shareimage.1686744881.png"
									alt="Guilherme Fortunato Alura Course"
									title="Guilherme Fortunato Alura Course"
									loading="lazy"
								/>
							</div>{" "}
							{/* Image */}
							<div className="modal-knowledge-box-single-text">
								<h3 framework-language-element-key="knowledge-modal-courses-alura1-title">
									Análise e Desenvolvimento de Sistemas - Alura - 2025
								</h3>

								<hr className="hr-horizontal" />

								<p framework-language-element-key="knowledge-modal-courses-alura1-description">
									Um curso ofertado pelo governo do Paraná através do{" "}
									<b>Novo Ensino médio</b>, aprendi um pouco sobre requisição de
									dados, modelo cascata, etc.
								</p>
							</div>{" "}
							{/* Text */}
						</div>{" "}
						{/* Modal Box Single */}
						{/* Modal Box Single */}
						<div className="modal-knowledge-box-single">
							<div className="modal-knowledge-box-single-image">
								<img
									src="https://www.alura.com.br/assets/img/aluraverso/shareimage.1686744881.png"
									alt="Guilherme Fortunato Alura Course"
									title="Guilherme Fortunato Alura Course"
									loading="lazy"
								/>
							</div>{" "}
							{/* Image */}
							<div className="modal-knowledge-box-single-text">
								<h3 framework-language-element-key="knowledge-modal-courses-alura2-title">
									Desenvolvimento Iniciante de Games - Alura - 2021
								</h3>

								<hr className="hr-horizontal" />

								<p framework-language-element-key="knowledge-modal-courses-alura2-description">
									Através do programa <b>Edutech</b> que aconteceu em 2021, eu
									participei e tive acesso à cursos da Alura que ensinavam como
									desenvolver jogos básicos usando{" "}
									<b>Scratch, JavaScript & GameMaker Studio</b>.
								</p>
							</div>{" "}
							{/* Text */}
						</div>{" "}
						{/* Modal Box Single */}
					</div>{" "}
					{/* Courses */}
					<hr className="hr-custom" />
					{/* Certificates */}
					<div className="modal-knowledge modal-knowledge-certificates flex">
						<h3
							className="modal-knowledge-subtitle"
							framework-language-element-key="knowledge-modal-subtitle-certificates"
						>
							Certificados
						</h3>
						{/* Modal Box Single */}
						<div className="modal-knowledge-box-single">
							<div className="modal-knowledge-box-single-image">
								<img
									src="/legacy/public/assets/certificates/logica_programacao.jpg"
									alt="Guilherme Fortunato Logica Programacao Course"
									title="Guilherme Fortunato Logica Programacao Course"
									loading="lazy"
								/>
							</div>{" "}
							{/* Image */}
							<div className="modal-knowledge-box-single-text">
								<h3 framework-language-element-key="knowledge-modal-certificates-programming_logic-title">
									Lógica de Programação - Danki Code
								</h3>

								<hr className="hr-horizontal" />

								<p framework-language-element-key="knowledge-modal-certificates-programming_logic-description">
									A lógica de programação é a base de tudo no mundo da
									programação.
								</p>

								<a
									href="https://cursos.dankicode.com/api/certificados/698378c8-dc05-404c-80ab-cc738b212194"
									target="_blank"
									framework-language-element-key="certified-link"
									title="Link Certificado"
								>
									Link Certificado
								</a>
							</div>{" "}
							{/* Text */}
						</div>{" "}
						{/* Modal Box Single */}
						{/* Modal Box Single */}
						<div className="modal-knowledge-box-single">
							<div className="modal-knowledge-box-single-image">
								<img
									src="/legacy/public/assets/certificates/front_end.jpg"
									alt="Guilherme Fortunato Front End Course"
									title="Guilherme Fortunato Front End Course"
									loading="lazy"
								/>
							</div>{" "}
							{/* Image */}
							<div className="modal-knowledge-box-single-text">
								<h3 framework-language-element-key="knowledge-modal-certificates-front_end-title">
									Front-End - Danki Code
								</h3>

								<hr className="hr-horizontal" />

								<p framework-language-element-key="knowledge-modal-certificates-front_end-description">
									Ensinando desde o básico e os fundamentos do Front-End até
									conceitos mais avançados.
								</p>

								<a
									href="https://cursos.dankicode.com/api/certificados/03b47828-aab0-4fd6-9b1b-d7f07f114fbc"
									target="_blank"
									framework-language-element-key="certified-link"
									title="Link Certificado"
								>
									Link Certificado
								</a>
							</div>{" "}
							{/* Text */}
						</div>{" "}
						{/* Modal Box Single */}
						{/* Modal Box Single */}
						<div className="modal-knowledge-box-single">
							<div className="modal-knowledge-box-single-image">
								<img
									src="/legacy/public/assets/certificates/front_end_2.jpg"
									alt="Guilherme Fortunato Front End 2 Course"
									title="Guilherme Fortunato Front End 2 Course"
									loading="lazy"
								/>
							</div>{" "}
							{/* Image */}
							<div className="modal-knowledge-box-single-text">
								<h3 framework-language-element-key="knowledge-modal-certificates-front_end2-title">
									Front-End 2.0 - Danki Code
								</h3>

								<hr className="hr-horizontal" />

								<p framework-language-element-key="knowledge-modal-certificates-front_end2-description">
									O curso ensinava o Front-End de uma forma mais moderna, usando
									as tags mais recentes do
									<b>HTML 5</b> como <b>header, section, footer, etc</b> e
									também usando <b>flexbox</b>
									deixando o <b>float</b> para o passado.
								</p>

								<a
									href="https://cursos.dankicode.com/api/certificados/82b8737b-07f4-4fdf-b9b5-c1a18194fa3a"
									target="_blank"
									framework-language-element-key="certified-link"
									title="Link Certificado"
								>
									Link Certificado
								</a>
							</div>{" "}
							{/* Text */}
						</div>{" "}
						{/* Modal Box Single */}
						{/* Modal Box Single */}
						<div className="modal-knowledge-box-single">
							<div className="modal-knowledge-box-single-image">
								<img
									src="/legacy/public/assets/certificates/design_web.jpg"
									alt="Guilherme Fortunato Design Web Course"
									title="Guilherme Fortunato Design Web Course"
									loading="lazy"
								/>
							</div>{" "}
							{/* Image */}
							<div className="modal-knowledge-box-single-text">
								<h3 framework-language-element-key="knowledge-modal-certificates-web_design-title">
									Design Web - Danki Code
								</h3>

								<hr className="hr-horizontal" />

								<p framework-language-element-key="knowledge-modal-certificates-web_design-description">
									Ensinado sobre <b>User Experience (UX)</b> e as melhores
									formas de se criar um design bonito, chamativo e saudável para
									seu negócio.
								</p>

								<a
									href="https://cursos.dankicode.com/api/certificados/e0a7bc00-afda-4e26-9976-bd17ae1e3c3e"
									target="_blank"
									framework-language-element-key="certified-link"
									title="Link Certificado"
								>
									Link Certificado
								</a>
							</div>{" "}
							{/* Text */}
						</div>{" "}
						{/* Modal Box Single */}
						{/* Modal Box Single */}
						<div className="modal-knowledge-box-single">
							<div className="modal-knowledge-box-single-image">
								<img
									src="/legacy/public/assets/certificates/javascript.jpg"
									alt="Guilherme Fortunato Javascript Course"
									title="Guilherme Fortunato Javascript Course"
									loading="lazy"
								/>
							</div>{" "}
							{/* Image */}
							<div className="modal-knowledge-box-single-text">
								<h3 framework-language-element-key="knowledge-modal-certificates-javascript-title">
									JavaScript - Danki Code
								</h3>

								<hr className="hr-horizontal" />

								<p framework-language-element-key="knowledge-modal-certificates-javascript-description">
									Uma linguagem de programação famosa e poderosa usada
									principalmente no <b>Desenvolvimento Web</b>.
								</p>

								<a
									href="https://cursos.dankicode.com/api/certificados/8b9217e1-bae6-4cc8-ada5-d719a2ec237c"
									target="_blank"
									framework-language-element-key="certified-link"
									title="Link Certificado"
								>
									Link Certificado
								</a>
							</div>{" "}
							{/* Text */}
						</div>{" "}
						{/* Modal Box Single */}
						{/* Modal Box Single */}
						<div className="modal-knowledge-box-single">
							<div className="modal-knowledge-box-single-image">
								<img
									src="/legacy/public/assets/certificates/desenvolvimento_de_aplicativos.jpg"
									alt="Guilherme Fortunato Desenvolvimento de Aplicativos Course"
									title="Guilherme Fortunato Desenvolvimento de Aplicativos Course"
									loading="lazy"
								/>
							</div>{" "}
							{/* Image */}
							<div className="modal-knowledge-box-single-text">
								<h3 framework-language-element-key="knowledge-modal-certificates-app_development-title">
									Desenvolvimento de Aplicativos - Danki Code
								</h3>

								<hr className="hr-horizontal" />

								<p framework-language-element-key="knowledge-modal-certificates-app_development-description">
									Aprendido como desenvolver aplicativos usando a{" "}
									<b>Biblioteca JavaScript</b> mais famosa para se desenvolver
									aplicativos para <b>Android</b> e <b>IOS</b> que seria o{" "}
									<b>React Native</b>.
								</p>

								<a
									href="https://cursos.dankicode.com/api/certificados/942a30a5-5dfb-4b7f-808e-d2ba138e0e8f"
									target="_blank"
									framework-language-element-key="certified-link"
									title="Link Certificado"
								>
									Link Certificado
								</a>
							</div>{" "}
							{/* Text */}
						</div>{" "}
						{/* Modal Box Single */}
						{/* Modal Box Single */}
						<div className="modal-knowledge-box-single">
							<div className="modal-knowledge-box-single-image">
								<img
									src="/legacy/public/assets/certificates/firebase.jpg"
									alt="Guilherme Fortunato Firebase Course"
									title="Guilherme Fortunato Firebase Course"
									loading="lazy"
								/>
							</div>{" "}
							{/* Image */}
							<div className="modal-knowledge-box-single-text">
								<h3 framework-language-element-key="knowledge-modal-certificates-firebase-title">
									Firebase - Danki Code
								</h3>

								<hr className="hr-horizontal" />

								<p framework-language-element-key="knowledge-modal-certificates-firebase-description">
									O curso ensina como hospedar suas aplicações usando a poderosa
									plataforma baseada em nuvem do <b>Google</b>.
								</p>

								<a
									href="https://cursos.dankicode.com/api/certificados/d78c0fc7-afb1-4462-8a74-422386517a62"
									target="_blank"
									framework-language-element-key="certified-link"
									title="Link Certificado"
								>
									Link Certificado
								</a>
							</div>{" "}
							{/* Text */}
						</div>{" "}
						{/* Modal Box Single */}
						{/* Modal Box Single */}
						<div className="modal-knowledge-box-single">
							<div className="modal-knowledge-box-single-image">
								<img
									src="/legacy/public/assets/certificates/php.jpg"
									alt="Guilherme Fortunato PHP Course"
									title="Guilherme Fortunato PHP Course"
									loading="lazy"
								/>
							</div>{" "}
							{/* Image */}
							<div className="modal-knowledge-box-single-text">
								<h3 framework-language-element-key="knowledge-modal-certificates-php-title">
									PHP - Danki Code
								</h3>

								<hr className="hr-horizontal" />

								<p framework-language-element-key="knowledge-modal-certificates-php-description">
									Ensinado sobre PHP, seus fundamentos e aprofundamento sobre a
									linguagem.
								</p>

								<a
									href="https://cursos.dankicode.com/api/certificados/7b0a58e0-ec71-4ab3-accf-7bfc62b0741f"
									target="_blank"
									framework-language-element-key="certified-link"
									title="Link Certificado"
								>
									Link Certificado
								</a>
							</div>{" "}
							{/* Text */}
						</div>{" "}
						{/* Modal Box Single */}
						{/* Modal Box Single */}
						<div className="modal-knowledge-box-single">
							<div className="modal-knowledge-box-single-image">
								<img
									src="/legacy/public/assets/certificates/banco_de_dados.jpg"
									alt="Guilherme Fortunato Banco de Dados Course"
									title="Guilherme Fortunato Banco de Dados Course"
									loading="lazy"
								/>
							</div>{" "}
							{/* Image */}
							<div className="modal-knowledge-box-single-text">
								<h3 framework-language-element-key="knowledge-modal-certificates-database-title">
									Banco De Dados - Danki Code
								</h3>

								<hr className="hr-horizontal" />

								<p framework-language-element-key="knowledge-modal-certificates-database-description">
									Um curso que ensina os principais banco de dados usados
									relacional e não relacional que seriam respectivamente{" "}
									<b>MySQL</b> e <b>MongoDB</b>.
								</p>

								<a
									href="https://cursos.dankicode.com/api/certificados/763b6932-7e83-49da-9817-79713fa4f342"
									target="_blank"
									framework-language-element-key="certified-link"
									title="Link Certificado"
								>
									Link Certificado
								</a>
							</div>{" "}
							{/* Text */}
						</div>{" "}
						{/* Modal Box Single */}
						{/* Modal Box Single */}
						<div className="modal-knowledge-box-single">
							<div className="modal-knowledge-box-single-image">
								<img
									src="/legacy/public/assets/certificates/ingles_para_programadores.jpg"
									alt="Guilherme Fortunato Inglês Para Programadores Course"
									title="Guilherme Fortunato Inglês Para Programadores Course"
									loading="lazy"
								/>
							</div>{" "}
							{/* Image */}
							<div className="modal-knowledge-box-single-text">
								<h3 framework-language-element-key="knowledge-modal-certificates-english_for_programmers-title">
									Inglês Para Programadores - Danki Code
								</h3>

								<hr className="hr-horizontal" />

								<p framework-language-element-key="knowledge-modal-certificates-english_for_programmers-description">
									Aprendido um pouco do inglês mais voltado para programadores e
									seus conceitos técnicos.
								</p>

								<a
									href="https://cursos.dankicode.com/api/certificados/ee5d9a94-0e20-45e7-969b-bc68648fca53"
									target="_blank"
									framework-language-element-key="certified-link"
									title="Link Certificado"
								>
									Link Certificado
								</a>
							</div>{" "}
							{/* Text */}
						</div>{" "}
						{/* Modal Box Single */}
						{/* Modal Box Single */}
						<div className="modal-knowledge-box-single">
							<div className="modal-knowledge-box-single-image">
								<img
									src="/legacy/public/assets/certificates/alura_all_certificates.jpg"
									alt="Guilherme Fortunato Alura Todos os Certificados"
									title="Guilherme Fortunato Alura Todos os Certificados"
									loading="lazy"
								/>
							</div>{" "}
							{/* Image */}
							<div className="modal-knowledge-box-single-text">
								<h3 framework-language-element-key="knowledge-modal-certificates-alura_all_certificates-title">
									Todos os Certificados - Alura
								</h3>

								<hr className="hr-horizontal" />

								<p framework-language-element-key="knowledge-modal-certificates-alura_all_certificates-description">
									Todos os cursos feitos e suas respectivas cargas horárias ao
									longo de toda minha jornada estudando na
									<b>Alura</b>.
								</p>

								<a
									href="https://cursos.alura.com.br/user/guilherme-fortunato-machado/fullCertificate/918a8de5a99bf26f9b69462b5d300c8d"
									target="_blank"
									framework-language-element-key="certified-link"
									title="Link Certificado"
								>
									Link Certificado
								</a>
							</div>{" "}
							{/* Text */}
						</div>{" "}
						{/* Modal Box Single */}
					</div>{" "}
					{/* Certifiates */}
					<hr className="hr-custom" />
					{/* Idioms */}
					<div className="modal-knowledge modal-knowledge-idioms flex">
						<h3
							className="modal-knowledge-subtitle"
							framework-language-element-key="knowledge-modal-subtitle-idioms"
						>
							Idiomas
						</h3>
						{/* Modal Custom Box Single */}
						<div className="modal-knowledge-custom-box-single w100 flex">
							<div className="modal-knowledge-custom-box-single-image w30">
								<img
									src="https://media.istockphoto.com/id/1357687122/pt/v%C3%ADdeo/national-flag-of-brazil-animation-stock-video-brazilian-flag-waving-in-loop-and-textured-3d.jpg?s=640x640&k=20&c=6-C0KT4ArY803qduTybeayIaZtSjhWhJFeX4WFOek5A="
									alt="Guilherme Fortunato Brazilian Portuguese Idiom"
									title="Guilherme Fortunato Brazilian Portuguese Idiom"
									loading="lazy"
								/>
							</div>{" "}
							{/* Image */}
							<div className="modal-knowledge-custom-box-single-text flex-column w70">
								<h3 framework-language-element-key="idioms-brazilian-portuguese">
									Português Brasileiro (Nativo)
								</h3>
								<hr className="hr-horizontal" />
								<div className="modal-knowledge-idioms-nivel flex pad15">
									<p framework-language-element-key="beginner-text">
										Iniciante
									</p>

									<div className="modal-knowledge-idioms-nivel-custom_line modal-knowledge-idioms-nivel-fill"></div>

									<p framework-language-element-key="intermediate-text">
										Intermediário
									</p>

									<div className="modal-knowledge-idioms-nivel-custom_line modal-knowledge-idioms-nivel-fill"></div>

									<p
										framework-language-element-key="fluent-text"
										className="modal-knowledge-idioms-nivel-fill"
									>
										Fluente
									</p>
								</div>{" "}
								{/* Modal Knowledge Idioms Nivel */}
							</div>{" "}
							{/* Text */}
						</div>{" "}
						{/* Modal Custom Box Single */}
						{/* Modal Custom Box Single */}
						<div className="modal-knowledge-custom-box-single w100 flex">
							<div className="modal-knowledge-custom-box-single-image w30">
								<img
									src="https://img.freepik.com/fotos-premium/bandeira-dos-estados-unidos-da-america-3d-ilustracao-da-bandeira-dos-estados-unidos-da-america-acenando_562847-224.jpg"
									alt="Guilherme Fortunato English USA Idiom"
									title="Guilherme Fortunato English USA Idiom"
									loading="lazy"
								/>
							</div>{" "}
							{/* Image */}
							<div className="modal-knowledge-custom-box-single-text flex-column w70">
								<h3 framework-language-element-key="idioms-english-united-states">
									Inglês Estados Unidos
								</h3>
								<hr className="hr-horizontal" />
								<div className="modal-knowledge-idioms-nivel flex pad15">
									<p framework-language-element-key="beginner-text">
										Iniciante
									</p>

									<div className="modal-knowledge-idioms-nivel-custom_line modal-knowledge-idioms-nivel-fill"></div>

									<p
										framework-language-element-key="intermediate-text"
										className="modal-knowledge-idioms-nivel-fill"
									>
										Intermediário
									</p>

									<div className="modal-knowledge-idioms-nivel-custom_line modal-knowledge-idioms-nivel-midfill"></div>

									<p framework-language-element-key="fluent-text">Fluente</p>
								</div>{" "}
								{/* Modal Knowledge Idioms Nivel */}
							</div>{" "}
							{/* Text */}
						</div>{" "}
						{/* Modal Custom Box Single */}
					</div>{" "}
					{/* Idioms */}
				</div>{" "}
				{/* Modal Knowledge Container */}
			</div>{" "}
			{/* Knowledge Modal */}
			{/* End Modals */}
			{/*-------------------------------------*/}
			{/*-------------------------------------*/}
			{/* Cookies Wrapper */}
			<div className="cookies-privay-wrapper">
				<div className="container pad10 flex-column">
					<div className="cookies-wrapper-icon">
						<i className="fa-solid fa-cookie-bite"></i>
					</div>

					<div className="cookies-wrapper-text text-center">
						<p framework-language-element-key="cookies-text">
							Utilizo <strong>cookies</strong> para tornar sua experiência por
							aqui mais fluida e personalizada.
						</p>
					</div>

					<div className="cookies-wrapper-actions flex">
						<button
							type="button"
							className="cookies-wrapper-actions-button-agree"
							framework-language-element-key="cookies-accept-button"
						>
							Eu Aceito
						</button>

						<a
							href="https://www.kaspersky.com.br/resource-center/definitions/cookies"
							target="_blank"
							framework-language-element-key="more-about-text"
							title="Saiba Mais"
						>
							Saiba Mais
						</a>
					</div>
				</div>{" "}
				{/* Container */}
			</div>{" "}
			{/* Cookies Wrapper */}
			{/* Footer */}
			<footer>
				<div className="container pad10">
					<div className="footer-row-divs flex">
						<div className="footer-navigation navigation flex-column w33 marg20">
							<nav>
								<ul>
									<li>
										<a
											href="#home"
											title="Home"
											js-scrolltarget="js-scroll-home-top"
											framework-language-element-key="navigation-home"
										>
											Home
										</a>
									</li>

									<li>
										<a
											href="#about-me"
											title="Sobre Mim"
											js-scrolltarget="js-scroll-about-me-text"
											framework-language-element-key="navigation-about-me"
										>
											Sobre Mim
										</a>
									</li>

									<li>
										<a
											href="#projects"
											title="Projetos"
											js-scrolltarget="js-scroll-projects-text"
											framework-language-element-key="navigation-projects"
										>
											Projetos
										</a>
									</li>

									<li>
										<a
											href="#knowledge"
											title="Conhecimento"
											js-scrolltarget="js-scroll-knowledge-text"
											framework-language-element-key="navigation-knowledge"
										>
											Conhecimento
										</a>
									</li>

									<li>
										<a
											href="#contact"
											title="Contato"
											js-scrolltarget="js-scroll-contact-text"
											framework-language-element-key="navigation-contact"
										>
											Contato
										</a>
									</li>
								</ul>
							</nav>
						</div>{" "}
						{/* Desktop Navigation */}
						<hr className="hr-vertical" />
						<div className="footer-social_media w33 marg20">
							<a
								href="https://www.linkedin.com/in/guilherme-fortunato-machado"
								target="_blank"
								title="LinkedIn"
							>
								<i className="fa-brands fa-linkedin"></i>
							</a>

							<a
								href="https://wa.me/+5541996954380?text=Olá%20Guilherme,%20vi%20seu%20portfólio%20e%20gostaria%20de%20conversar%20sobre%20uma%20oportunidade."
								target="_blank"
								title="Whatsapp"
							>
								<i className="fa-brands fa-whatsapp"></i>
							</a>

							<a
								href="https://github.com/guifm-dev"
								target="_blank"
								title="Github"
							>
								<i className="fa-brands fa-github"></i>
							</a>

							<a
								href="https://stackoverflow.com/users/18816701/deeplake"
								target="_blank"
								title="Stack Overflow"
							>
								<i className="fa-brands fa-stack-overflow"></i>
							</a>

							<a
								href="mailto:guilhermefortunatopr@gmail.com?subject=Vamos%20Falar%20Sobre%20Negócios&body=Olá%20Guilherme..."
								target="_blank"
								framework-language-element-key="email-contact-link"
								framework-language-contact-link="true"
								title="E-mail"
							>
								<i className="fa-solid fa-envelope"></i>
							</a>
						</div>{" "}
						{/* Social Media*/}
						<hr className="hr-vertical" />
						<div className="footer-actions w33 marg20">
							<button className="footer-backToTop button pad10">
								<i className="fa-solid fa-chevron-up"></i>
							</button>
						</div>{" "}
						{/* Footer Actions */}
					</div>{" "}
					{/* Footer Row Divs */}
				</div>{" "}
				{/* Container */}
				<div className="footer-subfooter w100 pad20">
					<p framework-language-element-key="footer-all-rights-reserved">
						&copy; 2026 - Desenvolvido e criado por Guilherme Fortunato Machado
					</p>
				</div>{" "}
				{/* SubFooter */}
			</footer>{" "}
			{/* Footer */}
			{/* Scripts */}
			{/* Lenis Smooth Scrolling */}
		</>
	);
}

export default App;
