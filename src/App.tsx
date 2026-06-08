import { ArrowUpRight, Mail } from "lucide-react";
import { Github, LinkedIn } from "./components/Icons";
import { motion } from "framer-motion";
import Section from "./components/section/Section";
import SectionLabel from "./components/section/SectionLabel";
import { projectsMeta, stack } from "./lib/data";
import Tag from "./components/Tag";
import { fadeUp, stagger, ease } from "./lib/framer-motion";
import LanguageSwitch from "./components/LanguageSwitch";
import { Trans, useTranslation } from "react-i18next";
import { Scrollbar } from "./components/Scrollbar";

function App() {

	const { t } = useTranslation();

	const experiences = t("experience.items", { returnObjects: true }) as Array<{
		role: string;
		company: string;
		period: string;
		description: string;
	}>

	const projects = (t("projects.items", { returnObjects: true }) as Array<{
		name: string;
		description: string;
	}>).map((p, i) => ({ ...p, ...projectsMeta[i] }));

	const education = t("education.items", { returnObjects: true }) as Array<{
		degree: string;
		school: string;
		period: string;
	}>;

	return (
		<div className="min-h-screen bg-background text-foreground">
			<Scrollbar />
			<div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-24 lg:py-32">

				<motion.nav
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease }}
					className="mb-24 flex-wrap sm:flex items-center justify-between text-sm"
				>
					<span className="font-serif text-lg">G.F.</span>

					<div className="flex items-center justify-between gap-6 text-muted-foreground mt-2 sm:mt-0">
						<div className="flex gap-4 sm:gap-6">
							{[
								["#about", t("nav.about")],
								["#projects", t("nav.projects")],
								["#contact", t("nav.contact")],
							].map(([href, label]) => (
								<a
									key={href}
									href={href}
									className="relative transition-colors hover:text-foreground after:absolute after:bottom-[-4px] after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-foreground after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100"
								>
									{label}
								</a>
							))}
						</div>

						<LanguageSwitch />
					</div>
				</motion.nav>

				<motion.header
					initial="hidden"
					animate="show"
					variants={stagger}
					className="mb-32 grid gap-10 sm:grid-cols-[1fr_auto] sm:items-center"
				>
					<div>
						<motion.p
							variants={fadeUp}
							className="mb-6 text-sm uppercase tracking-[0.2em] text-muted-foreground"
						>
							{t('hero.role')}
						</motion.p>

						<motion.h1
							variants={fadeUp}
							className="font-serif text-5xl leading-[1.05] sm:text-6xl lg:text-7xl"
						>
							Guilherme
							<br />Fortunato.
						</motion.h1>

						<motion.p
							variants={fadeUp}
							className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground"
						>
							{t('hero.bio')}
						</motion.p>

						<motion.div
							variants={fadeUp}
							className="mt-10 flex items-center gap-2"
						>
							{[
								{
									href: "https://www.github.com/guifm-dev",
									label: "GitHub",
									Icon: <Github size={18} strokeWidth={1.5} />
								},
								{
									href: "https://www.linkedin.com/in/guilherme-fortunato-machado",
									label: "LinkedIn",
									Icon: <LinkedIn size={18} strokeWidth={1.5} />
								},
								{
									href: t("contact.emailLink"),
									label: "E-mail",
									Icon: <Mail size={18} strokeWidth={1.5} />
								}
							].map(({ href, label, Icon }) => (
								<motion.a
									key={href}
									href={href}
									aria-label={label}
									whileHover={{ y: -3 }}
									transition={{ type: "spring", stiffness: 300, damping: 18 }}
									className="text-muted-foreground transition-colors hover:text-foreground p-2"
									target="_blank"
								>
									{Icon}
								</motion.a>
							))}

						</motion.div>

					</div>

					<motion.div
						initial={{ opacity: 0, scale: 0.94 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.9, ease }}
						className="order-first sm:order-last"
					>
						<motion.img
							src="/assets/photo.webp"
							alt="Foto de perfil de Guilherme Fortunato"
							title="Guilherme Fortunato — Full-Stack Developer"
							width={400}
							height={400}
							whileHover={{ scale: 1.03 }}
							transition={{ duration: 0.6, ease }}
							className="h-40 w-40 object-cover sm:h-48 sm:w-48"
						/>
					</motion.div>
				</motion.header>

				<Section id="about" className="mb-32">
					<SectionLabel>{t('about.label')}</SectionLabel>

					<motion.p
						variants={fadeUp}
						className="font-serif text-2xl leading-relaxed sm:text-3xl"
					>
						{t('about.lead')}
					</motion.p>

					<motion.p
						variants={fadeUp}
						className="mt-6 max-w-2xl leading-relaxed text-muted-foreground"
					>
						{t('about.body')}
					</motion.p>

					<motion.div
						variants={stagger}
						className="mt-10 flex flex-wrap gap-2"
					>
						{stack.map((tech) => (
							<Tag key={tech}>{tech}</Tag>
						))}
					</motion.div>
				</Section>

				<Section className="mb-32">
					<SectionLabel>{t('experience.label')}</SectionLabel>

					<div className="space-y-12">
						{experiences.map((job, index) => (
							<motion.article
								key={`experience-${index}`}
								variants={fadeUp}
								className="grid gap-2 sm:grid-cols-[160px_1fr] sm:gap-8"
							>
								<p className="text-sm text-muted-foreground">{job.period}</p>

								<div>
									<h3 className="font-serif text-xl">{job.role}</h3>
									<p className="mt-1 text-sm text-muted-foreground">{job.company}</p>

									<p className="mt-3 leading-relaxed text-foreground/80">{job.description}</p>
								</div>
							</motion.article>
						))
						}
					</div>
				</Section>

				<Section id="projects" className="mb-32">
					<SectionLabel>{t('projects.label')}</SectionLabel>

					<div className="divide-y divide-border border-y border-border">
						{projects.map((p, index) => (
							<motion.article
								key={`project-${index}`}
								variants={fadeUp}
								whileHover={{ x: 4 }}
								transition={{ type: "spring", stiffness: 200, damping: 24 }}
								className="group py-8"
							>
								<a href={p.link} target="_blank" rel="noopener noreferrer">
									<div className="flex items-start justify-between gap-4">

										<div className="flex-1">
											<div className="flex items-baseline gap-3">
												<h3 className="font-serif text-2xl">{p.name}</h3>
												<span className="text-xs text-muted-foreground">{p.year}</span>
											</div>

											<p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">{p.description}</p>

											<div className="mt-5 flex flex-wrap gap-2">
												{p.stack.map((s) => (
													<span
														key={s}
														className="inline-block border border-border px-3 py-1 text-xs uppercase tracking-wider text-muted-foreground"
													>
														{s}
													</span>
												))}
											</div>
										</div>

										<ArrowUpRight
											size={20}
											strokeWidth={1.5}
											className="mt-2 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground"
										/>
									</div>
								</a>
							</motion.article>
						))}
					</div>
				</Section>

				<Section className="mb-32">
					<SectionLabel>{t('education.label')}</SectionLabel>

					<div className="space-y-8">
						{education.map((e, index) => (
							<motion.article
								key={`education-${index}`}
								variants={fadeUp}
								className="grid gap-2 sm:grid-cols-[140px_1fr] sm:gap-8"
							>
								<p className="text-sm text-muted-foreground">{e.period}</p>

								<div>
									<h3 className="font-serif text-xl">{e.degree}</h3>
									<p className="mt-1 text-sm text-muted-foreground">{e.school}</p>
								</div>
							</motion.article>
						))}
					</div>
				</Section>

				<motion.footer
					id="contact"
					variants={stagger}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true, margin: "-80px" }}
					className="border-t border-border pt-16"
				>
					<motion.h2
						variants={fadeUp}
						className="font-serif text-4xl leading-[1.1] sm:text-5xl"
					>
						<Trans
							i18nKey="footer.cta"
							components={{ br: <br /> }}
						/>
					</motion.h2>

					<motion.div
						variants={fadeUp}
						className="mt-10 grid gap-6 sm:grid-cols-2">
						<div>
							<p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
								{t('footer.email')}
							</p>
							<a
								href={t("contact.emailLink")}
								target="_blank"
								className="mt-2 inline-block text-base hover:underline underline-offset-4"
								rel="noopener noreferrer">
								hello@guifm.dev
							</a>
						</div>

						<div>
							<p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
								{t('footer.social')}
							</p>

							<div className="mt-2 flex flex-col gap-1 text-base">
								<a href="https://www.github.com/guifm-dev" target="_blank" 
									rel="noopener noreferrer"
									className="hover:underline underline-offset-4">
									GitHub
								</a>

								<a href="https://www.linkedin.com/in/guilherme-fortunato-machado" target="_blank" 
									rel="noopener noreferrer"
									className="hover:underline underline-offset-4">
									LinkedIn
								</a>
							</div>
						</div>
					</motion.div>

					<motion.div
						variants={fadeUp}
						className="mt-16 flex items-center justify-between text-xs text-muted-foreground">
						<span>© 2026 Guilherme F. Machado</span>

						<span>{t('footer.location')}</span>
					</motion.div>
				</motion.footer>

			</div >
		</div >
	);
}

export default App;
