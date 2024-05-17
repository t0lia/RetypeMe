package com.retypeme.project.racing.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.core.env.Environment
import org.springframework.stereotype.Service

@Service
class TextGenerator @Autowired constructor(
    private val env: Environment
) {
    private val sentences = listOf(
        "the cat jumped over the moon and found a cozy spot to rest afterward",
        "a dog ran through a hill chasing its tail and brought joy to everyone around",
        "a bird sang a melodious tune in the morning creating a symphony with nature",
        "a tree grew beside a book its branches providing a perfect reading nook",
        "a river flowed under the horizon reflecting the colors of a breathtaking sunset",
        "the cat is very fluffy and playful bringing laughter and warmth to the household",
        "a loyal dog is a companion for life offering unconditional love and boundless joy",
        "a colorful bird is a messenger of happiness spreading beauty with each cheerful chirp",
        "a tall tree is a majestic presence sheltering creatures and standing the test of time",
        "a serene river is a source of tranquility its gentle flow soothing the weary soul"
    )

    fun generateText(): String {
        val randomSentence = sentences.random()

        if ("dev" in env.activeProfiles) {
            // Return only the first three words if 'dev' profile is active
            return randomSentence.split(" ").take(3).joinToString(" ")
        }

        return randomSentence
    }
}
