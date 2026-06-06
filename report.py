from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch, cm
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, Image, PageBreak, KeepTogether
)
from reportlab.pdfgen import canvas
from reportlab.platypus.flowables import Flowable
import os

PAGE_W, PAGE_H = A4
MARGIN = 1.2 * inch
CONTENT_W = PAGE_W - 2 * MARGIN

NAVY = colors.HexColor("#2E3A6E")
LIGHT_BLUE = colors.HexColor("#D5E8F0")
MID_BLUE = colors.HexColor("#4A6FA5")
WHITE = colors.white
GRAY = colors.HexColor("#555555")
LIGHT_GRAY = colors.HexColor("#F5F5F5")
BORDER_COLOR = colors.HexColor("#CCCCCC")

styles = getSampleStyleSheet()

def style(name, **kwargs):
    return ParagraphStyle(name, **kwargs)

TITLE_STYLE = style("Title2", fontName="Helvetica-Bold", fontSize=16, leading=20,
                    alignment=TA_CENTER, textColor=NAVY, spaceAfter=6)
SUBTITLE_STYLE = style("Subtitle2", fontName="Helvetica", fontSize=11, leading=14,
                       alignment=TA_CENTER, textColor=GRAY, spaceAfter=4)
HEADING1_STYLE = style("H1", fontName="Helvetica-Bold", fontSize=13, leading=18,
                       textColor=NAVY, spaceBefore=14, spaceAfter=6)
HEADING2_STYLE = style("H2", fontName="Helvetica-Bold", fontSize=11, leading=15,
                       textColor=MID_BLUE, spaceBefore=10, spaceAfter=4)
BODY_STYLE = style("Body2", fontName="Helvetica", fontSize=10, leading=14,
                   alignment=TA_JUSTIFY, textColor=colors.black, spaceAfter=6)
BOLD_BODY = style("BoldBody", fontName="Helvetica-Bold", fontSize=10, leading=14,
                  textColor=colors.black)
CENTER_STYLE = style("Center2", fontName="Helvetica", fontSize=10, leading=14,
                     alignment=TA_CENTER, textColor=colors.black)
CENTER_BOLD = style("CenterBold", fontName="Helvetica-Bold", fontSize=11, leading=14,
                    alignment=TA_CENTER, textColor=colors.black)
ITALIC_STYLE = style("Italic2", fontName="Helvetica-Oblique", fontSize=10, leading=14,
                     alignment=TA_CENTER, textColor=GRAY)
TOC_STYLE = style("TOC", fontName="Helvetica", fontSize=10, leading=16,
                  textColor=colors.black)


class BorderedPage:
    """Draw page border and footer on each page."""
    def __call__(self, canv, doc):
        canv.saveState()
        # Outer border
        canv.setStrokeColor(NAVY)
        canv.setLineWidth(2)
        canv.rect(0.5*inch, 0.5*inch, PAGE_W - 1.0*inch, PAGE_H - 1.0*inch)
        # Inner border
        canv.setLineWidth(0.5)
        canv.setStrokeColor(MID_BLUE)
        canv.rect(0.6*inch, 0.6*inch, PAGE_W - 1.2*inch, PAGE_H - 1.2*inch)

        # Footer
        canv.setFont("Helvetica", 8)
        canv.setFillColor(GRAY)
        page_num = doc.page
        canv.drawCentredString(PAGE_W/2, 0.38*inch, f"Page {page_num}")
        canv.drawString(0.7*inch, 0.38*inch, "EduMesh — AI Study Buddy")
        canv.drawRightString(PAGE_W - 0.7*inch, 0.38*inch, "JIS University, Kolkata")

        canv.restoreState()


def navy_rule():
    return HRFlowable(width="100%", thickness=1.5, color=NAVY, spaceAfter=6, spaceBefore=2)

def thin_rule():
    return HRFlowable(width="100%", thickness=0.5, color=BORDER_COLOR, spaceAfter=4, spaceBefore=4)

def section_heading(text):
    return [
        navy_rule(),
        Paragraph(text, HEADING1_STYLE),
    ]

def bullet_para(text):
    return Paragraph(f"&#x2022;&#160;&#160;{text}", BODY_STYLE)


def build_pdf():
    out_path = "EduMesh_Project_Report.pdf"

    on_page = BorderedPage()

    doc = SimpleDocTemplate(
        out_path,
        pagesize=A4,
        leftMargin=MARGIN, rightMargin=MARGIN,
        topMargin=MARGIN, bottomMargin=MARGIN,
        title="EduMesh — Project Synopsis",
        author="JIS University",
    )

    story = []

    # ─── COVER PAGE ───────────────────────────────────────────────────────────
    story.append(Spacer(1, 0.3*inch))

    # Logo
    if os.path.exists("jis_logo.png"):
        logo = Image("jis_logo.png", width=1.5*inch, height=1.3*inch)
        logo.hAlign = "CENTER"
        story.append(logo)
        story.append(Spacer(1, 0.15*inch))
    else:
        story.append(Spacer(1, 1.45*inch))

    story.append(Paragraph("EDUMESH", TITLE_STYLE))
    story.append(Paragraph("AI STUDY BUDDY", style("sub", fontName="Helvetica-Bold", fontSize=13,
                                                    alignment=TA_CENTER, textColor=MID_BLUE, spaceAfter=4)))
    story.append(Spacer(1, 0.08*inch))
    story.append(navy_rule())
    story.append(Spacer(1, 0.08*inch))

    story.append(Paragraph("PROJECT SYNOPSIS", style("ps", fontName="Helvetica-Bold", fontSize=12,
                                                      alignment=TA_CENTER, textColor=NAVY, spaceAfter=4)))
    story.append(Paragraph("Submitted in partial fulfilment of the", ITALIC_STYLE))
    story.append(Paragraph("Requirements for the award of the degree", ITALIC_STYLE))
    story.append(Spacer(1, 0.06*inch))
    story.append(Paragraph("<b>Of</b>", CENTER_STYLE))
    story.append(Spacer(1, 0.04*inch))
    story.append(Paragraph("<b>Bachelor of Technology</b>", CENTER_BOLD))
    story.append(Paragraph("<b>Department of Computer Science &amp; Engineering</b>", CENTER_BOLD))
    story.append(Spacer(1, 0.18*inch))
    story.append(Paragraph("By", CENTER_STYLE))
    story.append(Spacer(1, 0.08*inch))

    # Team table
    team = [
        ["Aditya Kumar Mishra",  "25CS2011005"],
        ["Arkadeep Dutta",       "25CS2011024"],
        ["Karan Ray",            "25CS2011056"],
        ["Anwesha Singh",        "25CS2011021"],
        ["Barsha Ghosh",         "25CS2011032"],
    ]
    team_rows = []
    for name, roll in team:
        team_rows.append([
            Paragraph(f"<b>{name}</b>", CENTER_BOLD),
            Paragraph(f"<b>{roll}</b>", CENTER_BOLD),
        ])

    col_w = CONTENT_W * 0.5
    team_table = Table(team_rows, colWidths=[col_w, col_w])
    team_table.setStyle(TableStyle([
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("ROWBACKGROUNDS", (0, 0), (-1, -1), [LIGHT_GRAY, WHITE]),
        ("BOX", (0, 0), (-1, -1), 1, NAVY),
        ("INNERGRID", (0, 0), (-1, -1), 0.5, BORDER_COLOR),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]))
    story.append(team_table)
    story.append(Spacer(1, 0.18*inch))

    story.append(Paragraph("Under the Guidance of", CENTER_STYLE))
    story.append(Paragraph("<b>Dr. Tanya Das</b>", CENTER_BOLD))
    story.append(Paragraph("Assistant Professor, CSE Department", CENTER_STYLE))
    story.append(Spacer(1, 0.18*inch))
    story.append(Paragraph("<b>2026</b>", CENTER_BOLD))
    story.append(Spacer(1, 0.1*inch))
    story.append(navy_rule())
    story.append(Spacer(1, 0.06*inch))
    story.append(Paragraph("<b>DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING</b>", CENTER_BOLD))
    story.append(Paragraph("<b>JIS UNIVERSITY, KOLKATA</b>", CENTER_BOLD))
    story.append(Spacer(1, 0.04*inch))
    story.append(Paragraph("<b>Date: 03.06.2026</b>", CENTER_STYLE))

    story.append(PageBreak())

    # ─── CERTIFICATE ──────────────────────────────────────────────────────────
    story.append(Spacer(1, 0.1*inch))
    story.append(Paragraph("<b>CERTIFICATE</b>", TITLE_STYLE))
    story.append(navy_rule())
    story.append(Spacer(1, 0.12*inch))

    cert_text = (
        'I hereby certify that the work which is being presented in the B. Tech Dissertation (Report) '
        'entitled <b>"EDUMESH — AI STUDY BUDDY"</b> in partial fulfilment of the requirements for the '
        'award of <b>Bachelor of Technology in Computer Science and Engineering</b> and submitted to the '
        '<b>Department of Computer Science and Engineering</b> of JIS University is an authentic record '
        'of work carried out during a period from Jan 2026 to May 2026 under the supervision of '
        '<i>Dr. Tanya Das</i>, <i>Assistant Professor</i>, Department of Computer Science and Engineering.'
    )
    story.append(Paragraph(cert_text, BODY_STYLE))
    story.append(Spacer(1, 0.06*inch))
    story.append(Paragraph("The matter presented in this thesis has not been submitted for the award of any other degree elsewhere.", BODY_STYLE))
    story.append(Spacer(1, 0.18*inch))

    story.append(team_table)
    story.append(Spacer(1, 0.3*inch))

    story.append(Paragraph("This is to certify that the above statement made by the candidates is correct to the best of my knowledge.", BODY_STYLE))
    story.append(Spacer(1, 0.5*inch))

    sig_data = [
        [Paragraph("<b>Signature of Guide</b>", CENTER_BOLD), "", ""],
        ["", "", ""],
        [Paragraph("<b>Signature of External</b>", CENTER_BOLD),
         "",
         Paragraph("<b>Signature of HOD,\nCSE Department</b>", CENTER_BOLD)],
    ]
    sig_table = Table(sig_data, colWidths=[CONTENT_W/3]*3)
    sig_table.setStyle(TableStyle([
        ("ALIGN", (0,0), (-1,-1), "CENTER"),
        ("VALIGN", (0,0), (-1,-1), "BOTTOM"),
        ("TOPPADDING", (0,0),(-1,-1), 6),
        ("BOTTOMPADDING", (0,0),(-1,-1), 6),
    ]))
    story.append(sig_table)

    story.append(PageBreak())

    # ─── ACKNOWLEDGEMENT ──────────────────────────────────────────────────────
    story.append(Spacer(1, 0.1*inch))
    story.append(Paragraph("<b>ACKNOWLEDGEMENT</b>", TITLE_STYLE))
    story.append(navy_rule())
    story.append(Spacer(1, 0.12*inch))

    ack = (
        'We wish to take this opportunity to convey our sincere thanks to all who in various ways have '
        'contributed to the success of this project. Their insights and continued support have been indispensable.'
    )
    story.append(Paragraph(ack, BODY_STYLE))

    ack2 = (
        'Prior to all, we would like to thank <b>Dr. Tanya Das</b> for initiating us on to this project. '
        'Her constant source of guidance, support and inspiration, perspective insight, friendly cooperation, '
        'valuable suggestions and advice have not only helped to complete this project in such a fine manner '
        'but will also act as a stepping stone for our professional careers. It has been a great pleasure '
        'learning and working under her.'
    )
    story.append(Paragraph(ack2, BODY_STYLE))

    story.append(Paragraph(
        'We would also like to thank all the staff members of the Computer Science Department (CSE) for '
        'their co-operation and constant motivation. Finally, we thank our peers and families for their endless encouragement.',
        BODY_STYLE
    ))
    story.append(Spacer(1, 0.12*inch))
    story.append(Paragraph("Thanks,", BODY_STYLE))
    story.append(Spacer(1, 0.18*inch))
    story.append(team_table)

    story.append(PageBreak())

    # ─── CONTENTS ─────────────────────────────────────────────────────────────
    story.append(Spacer(1, 0.1*inch))
    story.append(Paragraph("<b>CONTENTS</b>", TITLE_STYLE))
    story.append(navy_rule())
    story.append(Spacer(1, 0.1*inch))

    toc_data = [
        [Paragraph("<b>S. No.</b>", CENTER_BOLD), Paragraph("<b>Content</b>", BOLD_BODY), Paragraph("<b>Page No.</b>", CENTER_BOLD)],
        ["1", "Title Page", "1"],
        ["2", "Certificate", "2"],
        ["3", "Acknowledgement", "3"],
        ["4", "Contents", "4"],
        ["5", "Abstract", "5"],
        ["6", "Introduction", "6"],
        ["7", "Objectives", "8"],
        ["8", "Literature Survey", "9"],
        ["9", "Existing System", "10"],
        ["10", "Proposed Technique", "11"],
        ["11", "System Architecture", "12"],
        ["12", "Project Structure", "13"],
        ["13", "Expected Advantages", "14"],
        ["14", "Features", "15"],
        ["15", "Conclusion", "17"],
        ["16", "References", "18"],
    ]
    toc_rows = []
    for i, row in enumerate(toc_data):
        if i == 0:
            toc_rows.append([Paragraph(str(c.text if hasattr(c,'text') else c), CENTER_BOLD) if hasattr(row[j], 'text') else row[j] for j, c in enumerate(row)])
        else:
            toc_rows.append([
                Paragraph(str(row[0]), CENTER_STYLE),
                Paragraph(str(row[1]), BODY_STYLE),
                Paragraph(str(row[2]), CENTER_STYLE),
            ])

    toc_table = Table(toc_rows, colWidths=[0.6*inch, CONTENT_W - 1.3*inch, 0.7*inch])
    toc_table.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,0), NAVY),
        ("TEXTCOLOR", (0,0), (-1,0), WHITE),
        ("ALIGN", (0,0), (-1,-1), "CENTER"),
        ("ALIGN", (1,1), (1,-1), "LEFT"),
        ("ROWBACKGROUNDS", (0,1), (-1,-1), [LIGHT_GRAY, WHITE]),
        ("BOX", (0,0), (-1,-1), 1, NAVY),
        ("INNERGRID", (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ("TOPPADDING", (0,0), (-1,-1), 5),
        ("BOTTOMPADDING", (0,0), (-1,-1), 5),
        ("LEFTPADDING", (0,0), (-1,-1), 6),
    ]))
    story.append(toc_table)

    story.append(PageBreak())

    # ─── ABSTRACT ─────────────────────────────────────────────────────────────
    story.append(Spacer(1, 0.1*inch))
    story.append(Paragraph("<b>ABSTRACT</b>", TITLE_STYLE))
    story.append(navy_rule())
    story.append(Spacer(1, 0.08*inch))

    abstract = (
        'The rapid advancement of web technologies has enabled the development of highly interactive, '
        'browser-based applications that rival native software in quality and performance. At the same time, '
        'Artificial Intelligence has crossed a critical threshold, enabling nuanced, conversational, and highly '
        'contextual generation of information. <b>EduMesh</b> is an AI-powered study companion platform designed specifically '
        'for college students and lifelong learners. It provides instant explanations, smart note generation, '
        'adaptive quiz practice, and visual knowledge mapping in a single cohesive interface. Engineered using a modern '
        'technology stack comprising <b>React 18</b>, <b>Vite</b>, <b>Tailwind CSS</b>, <b>Supabase</b>, <b>Zustand</b>, and <b>Groq AI</b>, '
        'the platform places a premium on performance, scalability, and an intuitive user experience.'
    )
    story.append(Paragraph(abstract, BODY_STYLE))

    abstract2 = (
        'The system features an AI Study Chat module for real-time doubt resolution, a Smart Notes '
        'generator for structured topic-based study material, an MCQ Practice Quiz engine with instant '
        'feedback, and a Study Dashboard for tracking progress and streaks. Additionally, innovative tools like '
        'the Visual Mind Tree map out complex concepts graphically, and Feynman Mode acts as a rigorous '
        'study partner to test the user’s grasp on a subject. By employing a strict '
        'component-based architecture, client-side routing via React Router, and fluid animations through '
        'Framer Motion, EduMesh provides an uninterrupted, app-like experience directly within the browser. '
        'Integration with Vercel for deployment ensures continuous availability, while PDF export '
        'functionality via html2pdf.js enables offline access to generated notes. This project '
        'successfully demonstrates the practical implementation of modern full-stack web development '
        'concepts fused with cutting-edge AI capabilities to deliver a functional educational platform '
        'that transcends traditional study aids.'
    )
    story.append(Paragraph(abstract2, BODY_STYLE))

    story.append(PageBreak())

    # ─── INTRODUCTION ─────────────────────────────────────────────────────────
    story += section_heading("INTRODUCTION")
    story.append(Paragraph(
        'In the modern digital era, the nature of education and learning has fundamentally shifted. '
        'Students face mounting academic pressure with increasingly complex syllabi and limited access to '
        'personalized academic support. While the internet provides vast information, students often struggle '
        'to find structured, reliable explanations tailored to their specific questions and study needs. '
        'Traditional study methods — textbooks, passive note-taking, and rote memorization — frequently fail '
        'to ensure deep understanding or long-term retention. Furthermore, educational platforms are often '
        'cluttered, non-responsive on mobile devices, or siloed behind expensive subscriptions.',
        BODY_STYLE
    ))
    story.append(Paragraph(
        '<b>EduMesh</b> addresses these challenges by putting an AI-powered tutor directly in the student\'s '
        'pocket. The platform serves as a centralized, distraction-free academic hub where students can ask '
        'any conceptual doubt and receive instant, detailed explanations powered by Groq AI. Beyond standard Q&amp;A, '
        'EduMesh utilizes large language models to automatically generate well-structured, formatted study notes '
        'for any subject and topic, which can be instantly exported as PDFs for offline revision.',
        BODY_STYLE
    ))
    story.append(Paragraph(
        'EduMesh moves past passive learning by integrating active cognitive exercises. An integrated quiz engine '
        'creates dynamic MCQ-based practice tests with instant feedback, enabling active recall — a technique proven '
        'by cognitive science to dramatically improve memory retention. Furthermore, tools like the Visual Mind Tree '
        'help map out relationships between topics, while the Feynman Mode simulates teaching to an AI, reinforcing '
        'the highest level of mastery. A Study Dashboard comprehensively tracks study streaks, notes created, '
        'quizzes taken, and average scores, giving students a sense of progress, motivation, and accountability.',
        BODY_STYLE
    ))
    story.append(Paragraph(
        'Designed entirely as a Single Page Application (SPA) with secure, authenticated user accounts via '
        'Supabase, EduMesh provides a premium, personalized, and seamless academic environment accessible from '
        'any device — desktop, tablet, or mobile. By removing friction from the learning process, EduMesh '
        'empowers students to focus purely on intellectual growth.',
        BODY_STYLE
    ))
    story.append(Paragraph(f'<b>Live Application:</b> <font color="#4A6FA5">https://edu-mesh.vercel.app/</font>', BODY_STYLE))
    story.append(Paragraph(f'<b>Source Code:</b> <font color="#4A6FA5">https://github.com/karanray06/EduMesh</font>', BODY_STYLE))

    story.append(PageBreak())

    # ─── OBJECTIVES ───────────────────────────────────────────────────────────
    story += section_heading("OBJECTIVES")
    objectives = [
        "To engineer a centralized, highly-performant browser-based study platform utilizing React 18 that requires zero installation or configuration from the user.",
        "To implement seamless client-side routing using React Router, vastly reducing latency and improving navigation speed for a native app feel.",
        "To integrate Groq AI for real-time, conversational doubt resolution — enabling students to receive instant, contextual, and accurate explanations for complex academic topics.",
        "To implement a Smart Notes generator that produces structured, professionally-formatted study notes for any given subject and topic, with seamless PDF download capabilities for offline learning.",
        "To develop an adaptive Practice Quiz engine that dynamically generates multiple-choice assessments with instant feedback, leveraging active recall methodologies for superior knowledge retention.",
        "To build a comprehensive Study Dashboard that visually tracks study streaks, notes generated, quizzes attempted, and average quiz scores, promoting consistent and measurable study habits.",
        "To implement robust, secure user authentication and persistent data storage using Supabase (PostgreSQL), ensuring personalized experiences and data safety across multiple sessions.",
        "To design a highly responsive, 'utility-first' user interface using Tailwind CSS, featuring modern glassmorphism aesthetics that function flawlessly across desktops, tablets, and smartphones.",
        "To elevate user engagement and interface interactivity using Framer Motion for complex state transitions, micro-animations, and fluid visual feedback.",
        "To establish a highly scalable, modular, component-driven architecture that allows for rapid integration of future academic features and AI tools.",
        "To optimize application performance and minimize asset load times utilizing Vite as the next-generation frontend build tool.",
    ]
    for obj in objectives:
        story.append(bullet_para(obj))

    story.append(PageBreak())

    # ─── LITERATURE SURVEY ────────────────────────────────────────────────────
    story += section_heading("LITERATURE SURVEY")
    story.append(Paragraph(
        'The transition from static educational portals to highly interactive, AI-driven platforms '
        'has revolutionized modern EdTech. The proliferation of Large Language Models (LLMs) has opened new '
        'frontiers in personalized learning, enabling systems that can explain complex concepts in natural '
        'language, generate assessment material dynamically, and adapt to individual student needs in real-time. '
        'This convergence of cognitive psychology and advanced web architecture forms the foundation of EduMesh.',
        BODY_STYLE
    ))

    lit_points = [
        ("<b>AI in Education (AIEd) & Intelligent Tutoring:</b>",
         "Research by Holmes et al. (2019) and Luckin et al. (2016) documents that Intelligent Tutoring Systems (ITS) "
         "can produce learning gains nearly equivalent to one-on-one human tutoring. LLM-based systems extend "
         "this paradigm significantly by enabling open-domain Question & Answer formats without needing rigid, pre-structured content trees. "
         "This facilitates 'just-in-time' learning, reducing student frustration when encountering novel problems."),
        ("<b>Active Recall and Spaced Repetition:</b>",
         "Cognitive psychology research (Roediger & Karpicke, 2006) consistently demonstrates that "
         "active testing — rather than passive re-reading — produces superior long-term retention. EduMesh's quiz "
         "engine and flashcard mechanics are firmly grounded in this principle. The Feynman technique, integrated into EduMesh, "
         "further supports this by forcing the user to distill complex ideas into simple explanations, actively highlighting knowledge gaps."),
        ("<b>Single Page Applications (SPAs) and Web Performance:</b>",
         "Academic literature on web architectures confirms that client-side routing dramatically "
         "improves perceived performance. By eliminating full-page reloads and utilizing Virtual DOM rendering, "
         "SPAs mirror the smooth transitions of native mobile applications, significantly reducing cognitive disruption "
         "during prolonged study sessions."),
        ("<b>Groq AI and Hardware-Accelerated LLM Inference:</b>",
         "Groq's LPU (Language Processing Unit) architecture represents a breakthrough in low-latency inference "
         "for open-source models like LLaMA. This hardware acceleration makes real-time, conversational AI feasible "
         "in web applications, maintaining a high-speed interaction loop crucial for keeping students engaged."),
        ("<b>Backend-as-a-Service (BaaS) Paradigms:</b>",
         "Research on modern cloud architecture highlights BaaS platforms, such as Supabase, as pivotal in "
         "reducing time-to-market for full-stack applications. They securely abstract complex database scaling, "
         "real-time synchronization, and authentication, allowing developers to concentrate on the frontend learning experience."),
    ]
    for title, body in lit_points:
        story.append(Paragraph(title, HEADING2_STYLE))
        story.append(Paragraph(body, BODY_STYLE))

    story.append(PageBreak())

    # ─── EXISTING SYSTEM ──────────────────────────────────────────────────────
    story += section_heading("EXISTING SYSTEM")
    story.append(Paragraph(
        'The existing ecosystem of digital study tools is highly fragmented. Students typically '
        'navigate across multiple disconnected platforms — YouTube for video explanations, Quizlet for flashcards, '
        'Google Docs for note-taking, and ChatGPT for problem-solving. This fragmentation prevents a unified, '
        'intelligent academic companion experience. Analysis of current platforms reveals several critical limitations:',
        BODY_STYLE
    ))

    existing = [
        ("Generic Search Engines (Google, Bing):",
         "Provide raw, unstructured, and often overwhelming information. Students spend excessive time filtering SEO-driven content rather than studying. There is zero personalization or assessment capability."),
        ("ChatGPT / General AI Chatbots:",
         "While highly capable, they suffer from being 'blank canvases'. They lack subject-specific structure, built-in study tracking, integrated note organization, or automated quiz generation in a single, academic-focused interface. Users must manually prompt everything."),
        ("Quizlet & Flashcard Apps:",
         "Excellent for rote memorization but heavily reliant on user-created content or static databases. They offer no dynamic AI generation for complex conceptual explanations and lack deeper problem-solving tools."),
        ("Traditional E-Learning Platforms (Coursera, Udemy):",
         "Provide structured, long-form courses but are rigid. They are not designed for on-demand, instant doubt resolution, rapid revision, or interactive problem probing."),
        ("Notion / Google Docs:",
         "Powerful general-purpose productivity tools, but they lack native AI educational generation, have no built-in quiz integration, and offer no study progress tracking mechanics. They are tools for writing, not explicitly tools for learning."),
    ]
    ex_rows = [[Paragraph(f"<b>{t}</b>", BOLD_BODY), Paragraph(b, BODY_STYLE)] for t, b in existing]
    ex_table = Table(ex_rows, colWidths=[1.8*inch, CONTENT_W - 1.8*inch])
    ex_table.setStyle(TableStyle([
        ("VALIGN", (0,0), (-1,-1), "TOP"),
        ("ROWBACKGROUNDS", (0,0), (-1,-1), [LIGHT_GRAY, WHITE]),
        ("BOX", (0,0), (-1,-1), 1, NAVY),
        ("INNERGRID", (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ("TOPPADDING", (0,0), (-1,-1), 8),
        ("BOTTOMPADDING", (0,0), (-1,-1), 8),
        ("LEFTPADDING", (0,0), (-1,-1), 6),
    ]))
    story.append(ex_table)

    story.append(PageBreak())

    # ─── PROPOSED TECHNIQUE & SYSTEM ARCHITECTURE ─────────────────────────────
    story += section_heading("PROPOSED TECHNIQUE & SYSTEM ARCHITECTURE")
    story.append(Paragraph(
        'EduMesh proposes a unified, full-stack AI-powered academic platform engineered to overcome the '
        'limitations and fragmentation of existing tools. The architecture follows a modern, highly scalable JAMstack '
        'pattern. The frontend is a React Single Page Application, the backend relies on Supabase for data persistence '
        'and authentication, and the intelligence layer is driven by Groq AI.',
        BODY_STYLE
    ))

    tech_points = [
        ("Frontend Framework (React 18 & Vite):",
         "React efficiently manages the complex, interconnected state across various tools (Chat, Notes, Quizzes, MindTree). Vite ensures rapid Hot Module Replacement (HMR) during development and highly optimized, chunked static assets in production."),
        ("Routing (React Router DOM):",
         "Implements client-side routing to guarantee instant context switching between study tools. This eliminates network round-trips for HTML fetching, dramatically lowering perceived latency."),
        ("Styling (Tailwind CSS):",
         "Utilizes a utility-first CSS methodology to construct a 'glassmorphism' aesthetic. This creates a fully responsive, visually pleasing environment that adapts seamlessly across all mobile, tablet, and desktop viewports."),
        ("State Management (Zustand):",
         "Provides a minimalist, hook-based global state management system. It synchronizes user authentication status, tracks study statistics, and manages quiz progress without the heavy boilerplate associated with Redux."),
        ("Authentication & Database (Supabase):",
         "A robust PostgreSQL-backed BaaS providing secure JWT-based authentication. It handles the persistent storage of generated notes, user profiles, quiz histories, and gamified study streaks securely in the cloud."),
        ("AI Intelligence Engine (Groq AI & LLaMA):",
         "Leverages Groq's specialized LPU hardware for ultra-low-latency AI inference. This powers the conversational chat, note generation, semantic flashcard creation, and dynamic quiz structuring, delivering answers faster than traditional GPU-based APIs."),
        ("Animations (Framer Motion):",
         "Orchestrates complex DOM animations, page transitions, and interactive UI feedback. This reduces cognitive load during context switching and elevates the application to feel like a premium native product."),
    ]
    for title, body in tech_points:
        story.append(Paragraph(f"<b>{title}</b>", HEADING2_STYLE))
        story.append(Paragraph(body, BODY_STYLE))

    story.append(Paragraph("<b>System Architecture Flow</b>", HEADING2_STYLE))
    
    flow_items = [
        "User Interface (React Router SPA / Tailwind CSS)",
        "Global State Layer (Zustand & Context APIs)",
        "Application Modules (Chat, Notes, Quiz, MindTree, Flashcards)",
        "API Service Layer (Groq AI Integration & Prompts)",
        "Backend Services (Supabase Auth & PostgreSQL DB)",
        "Deployment & Delivery (Vercel CDN Edge Network)"
    ]
    flow_rows = [[Paragraph(f"&#x25B6;&#160;&#160;{item}", CENTER_STYLE)] for item in flow_items]
    flow_table = Table(flow_rows, colWidths=[CONTENT_W])
    flow_colors = [NAVY, MID_BLUE, colors.HexColor("#5A7FC0"), colors.HexColor("#6A8FD0"),
                   colors.HexColor("#4A7FAA"), colors.HexColor("#3A6F9A")]
    ts_cmds = [("ALIGN", (0,0), (-1,-1), "CENTER"), ("TOPPADDING", (0,0), (-1,-1), 8),
               ("BOTTOMPADDING", (0,0), (-1,-1), 8), ("BOX", (0,0), (-1,-1), 1, NAVY),
               ("TEXTCOLOR", (0,0), (-1,-1), WHITE)]
    for i, fc in enumerate(flow_colors):
        ts_cmds.append(("BACKGROUND", (0,i), (0,i), fc))
    flow_table.setStyle(TableStyle(ts_cmds))
    story.append(flow_table)

    story.append(PageBreak())

    # ─── PROJECT STRUCTURE ────────────────────────────────────────────────────
    story += section_heading("PROJECT STRUCTURE")
    story.append(Paragraph(
        'To ensure high maintainability, scalability, and a clean separation of concerns, the EduMesh project '
        'directory is structured hierarchically. Global assets are isolated, common UI elements are modularized, '
        'and specific business logic is contained within dedicated feature directories.',
        BODY_STYLE
    ))

    struct_data = [
        [Paragraph("<b>Directory / File</b>", BOLD_BODY), Paragraph("<b>Purpose</b>", BOLD_BODY)],
        ["src/components/ui/", "Contains highly reusable, atomic UI components (e.g., GlassCard, Button, InputField, AnimatedBackground)."],
        ["src/components/layout/", "Houses structural components like the MainLayout, Sidebar, and Top Navigation bars."],
        ["src/pages/", "Holds the primary routable views: Dashboard, AIChat, StudyNotes, Quiz, Feynman, MindTree, Flashcards."],
        ["src/services/", "Encapsulates external API logic, particularly the Groq AI service wrapper, prompt engineering, and PDF generation logic."],
        ["src/store/", "Contains Zustand global state definitions (studyStore.js, authStore.js) for managing local client data."],
        ["src/lib/", "Configuration and initialization files for third-party SDKs, primarily the Supabase client."],
        ["src/App.jsx", "The core React Router setup, defining public and protected routes across the application."],
        ["src/main.jsx", "The React application entry point, attaching the component tree to the root DOM node."],
        ["src/index.css", "Global stylesheets containing Tailwind directives, custom glassmorphism utilities, and CSS variables."],
        [".env", "Secure environment configuration storing Supabase URL/Keys and Groq API credentials."],
        ["tailwind.config.js", "Configuration for Tailwind, defining the custom pastel color palette and theme extensions."],
    ]
    struct_rows = []
    for i, row in enumerate(struct_data):
        if i == 0:
            struct_rows.append(row)
        else:
            struct_rows.append([
                Paragraph(f"<font face='Courier'>{row[0]}</font>", style("code", fontName="Courier", fontSize=8.5, leading=12)),
                Paragraph(str(row[1]), BODY_STYLE),
            ])
    struct_table = Table(struct_rows, colWidths=[2.2*inch, CONTENT_W - 2.2*inch])
    struct_table.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,0), NAVY),
        ("TEXTCOLOR", (0,0), (-1,0), WHITE),
        ("ROWBACKGROUNDS", (0,1), (-1,-1), [LIGHT_GRAY, WHITE]),
        ("BOX", (0,0), (-1,-1), 1, NAVY),
        ("INNERGRID", (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ("TOPPADDING", (0,0), (-1,-1), 8),
        ("BOTTOMPADDING", (0,0), (-1,-1), 8),
        ("LEFTPADDING", (0,0), (-1,-1), 6),
        ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
    ]))
    story.append(struct_table)

    story.append(PageBreak())

    # ─── EXPECTED ADVANTAGES ──────────────────────────────────────────────────
    story += section_heading("EXPECTED ADVANTAGES")

    adv = [
        ("Cognitive Stimulation & Active Recall:", "Direct mental benefits are provided through engaging exercises like quizzes and Feynman mode, significantly improving retention compared to passive reading."),
        ("Personalised AI Learning:", "Students receive tailored, context-aware explanations for their specific doubts rather than generic web search results, dramatically enhancing comprehension speed and quality."),
        ("Instantaneous Doubt Resolution:", "By leveraging Groq AI's extremely low-latency inference, responses are near-instant, eliminating the frustrating wait associated with forums or human tutors."),
        ("Structured Knowledge Capture:", "Unlike raw chat logs, the AI-generated study notes are automatically structured with headings, bullet points, definitions, and formulas, making revision highly efficient."),
        ("Quantifiable Progress Awareness:", "The Study Dashboard makes learning progress tangible. Tracking streaks, notes, and quiz scores fosters accountability and motivates consistent daily study habits."),
        ("Cross-Platform Accessibility:", "The 'utility-first' responsive design guarantees that the application functions optimally across any screen resolution—desktop or mobile—without requiring native app downloads."),
        ("Offline Study Autonomy:", "The ability to export generated notes as perfectly formatted PDFs ensures students can continue studying even without internet connectivity."),
        ("Elimination of Platform Fragmentation:", "A single, cohesive platform replaces the need to constantly switch between Google Docs, ChatGPT, and Quizlet, reducing cognitive overhead and maintaining focus."),
        ("Developer Ergonomics & Scalability:", "The modular, component-driven React architecture makes reading, updating, and debugging the codebase exceptionally straightforward, allowing new subjects or tools to be plugged in effortlessly."),
    ]
    for title, body in adv:
        story.append(bullet_para(f"<b>{title}</b> {body}"))

    story.append(PageBreak())

    # ─── FEATURES ─────────────────────────────────────────────────────────────
    story += section_heading("FEATURES")

    feat_data = [
        [Paragraph("<b>Feature</b>", BOLD_BODY), Paragraph("<b>Description &amp; Implementation</b>", BOLD_BODY)],
        ["Conversational AI Study Chat",
         "A real-time dialogue interface where students can ask academic questions. Powered by Groq AI, it maintains conversational context, allowing for follow-up questions and deep-dives into complex topics."],
        ["Smart Notes Generator & PDF Export",
         "Users specify a subject and topic. The AI synthesizes comprehensive, beautifully formatted study notes with examples and key formulas. These notes can be instantly downloaded as offline-ready PDFs."],
        ["Adaptive Practice Quizzes",
         "The system dynamically generates multiple-choice questions on any topic. Instant feedback is provided upon submission, complete with detailed explanations for incorrect answers to reinforce learning."],
        ["Feynman Technique Mode",
         "An innovative feature where roles are reversed: the student explains a concept to the AI. The AI acts as a confused learner, probing for gaps in the student's explanation and scoring their mastery at the end."],
        ["Visual Mind Tree",
         "A graphical interface utilizing React Flow to dynamically map out related subtopics and concepts from a central node, helping visual learners understand the broader architecture of a subject."],
        ["Spaced Repetition Flashcards",
         "A digital flashcard system designed to test and reinforce memory. Users can flip cards and rate difficulty, tying into the broader active recall strategy of the platform."],
        ["Comprehensive Study Dashboard",
         "A central hub displaying real-time statistics: current study streak (consecutive days), total notes generated, total quizzes taken, and average scores—all persisted securely in the Supabase database."],
        ["Secure User Authentication",
         "Robust email/password sign-up and login workflows handled securely via Supabase Auth, ensuring each user retains their private study history and dashboard metrics across devices."],
        ["Premium Glassmorphism UI",
         "A visually stunning, distraction-free interface built with Tailwind CSS. It features frosted glass effects, subtle pastel gradients, and precise typography to create an inviting study environment."],
    ]
    feat_rows = []
    for i, row in enumerate(feat_data):
        if i == 0:
            feat_rows.append(row)
        else:
            feat_rows.append([Paragraph(str(row[0]), BOLD_BODY), Paragraph(str(row[1]), BODY_STYLE)])

    feat_table = Table(feat_rows, colWidths=[1.6*inch, CONTENT_W - 1.6*inch])
    feat_table.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,0), NAVY),
        ("TEXTCOLOR", (0,0), (-1,0), WHITE),
        ("ROWBACKGROUNDS", (0,1), (-1,-1), [LIGHT_GRAY, WHITE]),
        ("BOX", (0,0), (-1,-1), 1, NAVY),
        ("INNERGRID", (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ("TOPPADDING", (0,0), (-1,-1), 8),
        ("BOTTOMPADDING", (0,0), (-1,-1), 8),
        ("LEFTPADDING", (0,0), (-1,-1), 6),
        ("VALIGN", (0,0), (-1,-1), "TOP"),
    ]))
    story.append(feat_table)

    story.append(PageBreak())

    # ─── CONCLUSION ───────────────────────────────────────────────────────────
    story += section_heading("CONCLUSION")
    story.append(Paragraph(
        'The EduMesh application successfully demonstrates the immense capability of modern frontend frameworks '
        'combined with cutting-edge artificial intelligence to deliver high-quality, interactive educational experiences '
        'directly within the browser ecosystem. By thoughtfully combining AI-powered doubt resolution, intelligent '
        'study note generation, targeted cognitive exercises like quizzes, and novel learning frameworks like Feynman mode, '
        'it overcomes the severe limitations and fragmentation of legacy study platforms.',
        BODY_STYLE
    ))
    story.append(Paragraph(
        'The utilization of React Router ensures fluid, instant navigation, while Framer Motion elevates the interface '
        'through professional-grade animated transitions, reducing cognitive load. The integration of Groq AI’s '
        'low-latency models ensures the platform remains highly responsive, keeping students engaged without frustrating delays. '
        'Simultaneously, Supabase provides a rock-solid foundation for data security and cross-session persistence.',
        BODY_STYLE
    ))
    story.append(Paragraph(
        'Most importantly, the modular, component-based architecture establishes a robust and scalable foundation. '
        'This guarantees that EduMesh is not just a static academic project, but an evolving educational ecosystem '
        'ready for future expansions, such as collaborative study groups, multi-modal AI inputs, and integration '
        'with institutional Learning Management Systems. Ultimately, EduMesh serves as a testament to how technology '
        'can be harnessed to democratize high-quality, personalized education for students everywhere.',
        BODY_STYLE
    ))

    story.append(PageBreak())

    # ─── REFERENCES ───────────────────────────────────────────────────────────
    story += section_heading("REFERENCES")

    refs = [
        "React Documentation. (n.d.). React: A JavaScript library for building user interfaces. Retrieved from https://react.dev/",
        "Vite. (n.d.). Vite: Next Generation Frontend Tooling. Retrieved from https://vitejs.dev/",
        "Supabase Documentation. (n.d.). The Open Source Firebase Alternative. Retrieved from https://supabase.com/docs",
        "Groq AI. (n.d.). Groq: LPU Inference Engine Documentation. Retrieved from https://console.groq.com/docs",
        "Zustand. (n.d.). A small, fast, and scalable state-management solution. Retrieved from https://zustand-demo.pmnd.rs/",
        "Tailwind CSS. (n.d.). Rapidly build modern websites without ever leaving your HTML. Retrieved from https://tailwindcss.com/",
        "Framer Motion. (n.d.). A production-ready motion library for React. Retrieved from https://www.framer.com/motion/",
        "React Router Documentation. (n.d.). Declarative routing for React. Retrieved from https://reactrouter.com/",
        "html2pdf.js. (n.d.). Client-side HTML to PDF conversion. Retrieved from https://ekoopmans.github.io/html2pdf.js/",
        "Roediger, H. L., & Karpicke, J. D. (2006). Test-enhanced learning: Taking memory tests improves long-term retention. Psychological Science, 17(3), 249–255.",
        "Holmes, W., Bialik, M., & Fadel, C. (2019). Artificial Intelligence in Education: Promises and Implications for Teaching and Learning. Center for Curriculum Redesign.",
        "Vercel Documentation. (n.d.). Vercel: Develop, Preview, Ship. Retrieved from https://vercel.com/docs",
        "MDN Web Docs. (n.d.). Web technology for developers. Retrieved from https://developer.mozilla.org/",
    ]
    for i, ref in enumerate(refs, 1):
        story.append(Paragraph(f"[{i}]  {ref}", style(f"ref{i}", fontName="Helvetica", fontSize=9,
                                                        leading=13, spaceAfter=5, leftIndent=20,
                                                        firstLineIndent=-20, textColor=colors.black)))

    doc.build(story, onFirstPage=on_page, onLaterPages=on_page)
    print(f"PDF created: {out_path}")

if __name__ == '__main__':
    build_pdf()