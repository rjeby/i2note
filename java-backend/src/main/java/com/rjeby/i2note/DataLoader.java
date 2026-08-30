package com.rjeby.i2note;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.rjeby.i2note.models.Note;
import com.rjeby.i2note.models.Tag;
import com.rjeby.i2note.models.User;
import com.rjeby.i2note.repositories.NoteRepository;
import com.rjeby.i2note.repositories.TagRepository;
import com.rjeby.i2note.repositories.UserRepository;

@Component
public class DataLoader implements CommandLineRunner {

    private final TagRepository tagRepository;
    private final NoteRepository noteRepository;
    private final UserRepository userRepository;

    public DataLoader(UserRepository userRepository, NoteRepository noteRepository, TagRepository tagRepository) {
        this.userRepository = userRepository;
        this.noteRepository = noteRepository;
        this.tagRepository = tagRepository;

    }

    public void run(String... args) {
        Integer noteCount = (int) (Math.random() * (150 - 100 + 1)) + 100;
        List<String> tagPool = List.of("work", "ideas", "personal", "dreams", "learning", "quotes", "projects",
                "finance", "health", "startup", "coding", "philosophy", "journal", "design", "goals", "random", "ai",
                "automation", "productivity", "habits", "business", "strategy", "focus", "architecture", "systems",
                "ux", "burnout", "resilience", "growth", "discipline", "writing", "creativity", "leadership", "legacy",
                "curiosity", "risk", "experiments", "roadmap", "emotion", "travel", "mindset", "branding", "networking",
                "vision", "product", "debugging", "databases", "security", "scaling", "ops", "cloud", "feedback",
                "refactoring", "testing");
        List<String> titles = List.of("Midnight thoughts", "Future version of me", "Startup brain dump",
                "Painful lessons", "When motivation dies", "Dream archive", "Plans that terrify me",
                "Unfiltered journal", "Why I started", "Failure notes", "The long game", "Life OS", "Creative chaos",
                "Mental reset", "Product ideas I love", "Rules for myself", "Hard truths", "Focus experiments",
                "What actually matters", "Thoughts on freedom", "My coding therapy", "Business scars",
                "Lessons from silence", "Fear inventory", "Evolution notes", "Personal strategy",
                "The future me deserves", "Notes from confusion", "Simplify everything", "Burn the old version",
                "Systems journal", "Product blueprints", "Diary of a builder", "I refuse average",
                "The price of comfort", "Vision draft", "Rewriting my story", "Letters to my future self",
                "Things I need to remember",
                "Building something that lasts");
        List<String> contents = List.of("I keep waiting for the perfect moment that doesn’t exist.",
                "Everything hard in life gives better rewards.",
                "I want results, not noise.",
                "If I don't build, I decay.",
                "Small decisions quietly shape everything.",
                "The future punishes hesitation.",
                "Nobody is coming. That’s power.",
                "Progress never feels fast.",
                "I’m learning to disappoint people to stop disappointing myself.",
                "Comfort is a beautiful trap.",
                "My future self is watching.",
                "Most of my limits exist only in my mind.",
                "Discipline feels unfair until it pays off.",
                "I build in silence so I can live loud.",
                "I owe my future self more.",
                "I’m done playing small.",
                "Everything I want is on the other side of effort.",
                "Fear is a signpost.",
                "It’s okay to be misunderstood while growing.",
                "I need courage more than clarity.",
                "You don't rise to goals; you fall to systems.",
                "Hard work changes identity.",
                "Nothing changes if nothing changes.",
                "The long road builds strength.",
                "I prioritize impact over comfort.",
                "I will outgrow this version of me.",
                "Progress isn’t loud.",
                "The grind is teaching me.",
                "I want mastery, not mediocrity.",
                "Time is not neutral.",
                "I choose growth daily.",
                "I get closer even on bad days.",
                "I build momentum privately.",
                "I’m not afraid of starting late.",
                "I refuse regression.",
                "Chaos becomes clarity eventually.",
                "This is my chapter.",
                "Results are delayed, not denied.",
                "Resilience compounds.",
                "Focus prints freedom.");

        // Create User

        User user = userRepository
                .save(User.builder().isVerified(false).email("user.x@gmail.com").password("eazypeasy").build());

        List<Tag> tags = tagPool.stream().map(content -> Tag.builder().content(content).build())
                .collect(Collectors.toList());
        tags = tagRepository.saveAll(tags);

        for (int i = 0; i <= noteCount; i++) {
            Integer random = (int) (Math.random() * contents.size());
            String content = contents.get(random);
            String title = titles.get(random);
            Integer tagsCount = (int) (Math.random() * 8) + 3;
            //Collections.shuffle(tags);
            List<Tag> related = tags.subList(0, tagsCount);
            noteRepository
                    .save(Note.builder().content(content).title(title).isArchived(false).user(user).tags(related)
                            .build());
        }

    }

}
