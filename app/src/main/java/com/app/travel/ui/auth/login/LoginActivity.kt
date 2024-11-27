package com.app.travel.ui.auth.login

import android.app.ActivityOptions
import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.app.travel.MainActivity
import com.app.travel.R
import com.app.travel.ui.auth.register.RegisterActivity

class LoginActivity : AppCompatActivity() {
    private lateinit var buttonLogin: Button
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)
        supportActionBar?.hide()
        val tvRegister = findViewById<TextView>(R.id.textViewRegister)
        tvRegister.setOnClickListener {
            val intent = Intent(this, RegisterActivity::class.java)
            startActivity(intent, ActivityOptions.makeSceneTransitionAnimation(this).toBundle())
        }
        buttonLogin = findViewById(R.id.LoginButton)
        buttonLogin.setOnClickListener {
            val intent = Intent(this, MainActivity::class.java)
            startActivity(intent, ActivityOptions.makeSceneTransitionAnimation(this).toBundle())
        }
    }
}