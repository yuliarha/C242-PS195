package com.app.travel.ui.auth.login

import android.app.ActivityOptions
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.view.WindowInsets
import android.view.WindowManager
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.activity.viewModels
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import com.app.travel.MainActivity
import com.app.travel.R
import com.app.travel.data.repo.Injection
import com.app.travel.databinding.ActivityLoginBinding
import com.app.travel.databinding.LayoutLoginBinding
import com.app.travel.databinding.LayoutRegisterBinding
import com.app.travel.ui.ViewModelFactory
import com.app.travel.ui.auth.register.RegisterActivity

class LoginActivity : AppCompatActivity() {
    private lateinit var buttonLogin: Button
    private val loginViewModel: LoginViewModel by viewModels {
        ViewModelFactory(Injection.provideRepository(this))
    }
    private lateinit var binding: LayoutLoginBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = LayoutLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)
        supportActionBar?.hide()

        val tvRegister = findViewById<TextView>(R.id.textViewRegister)
        tvRegister.setOnClickListener {
            val intent = Intent(this, RegisterActivity::class.java)
            startActivity(intent, ActivityOptions.makeSceneTransitionAnimation(this).toBundle())
        }
        buttonLogin = findViewById(R.id.loginButton)
        buttonLogin.setOnClickListener {
            val intent = Intent(this, MainActivity::class.java)
            startActivity(intent, ActivityOptions.makeSceneTransitionAnimation(this).toBundle())
        }

        setupView()
        setupObserver()
        setupAction()
    }

    private fun setupView() {
        @Suppress("DEPRECATION")
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            window.insetsController?.hide(WindowInsets.Type.statusBars())
        } else {
            window.setFlags(
                WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN
            )
        }
        supportActionBar?.hide()
    }

    private fun setupAction() {
        binding.loginButton.setOnClickListener {
            val name = binding.editTextEmail.text.toString().trim()
            val password = binding.editTextPassword.text.toString().trim()

            if (name.isEmpty() || password.isEmpty()) {
                Toast.makeText(this, "All fields must be filled", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }
            loginViewModel.login(name, password)
        }
    }

    private fun setupObserver() {
        loginViewModel.loginResult.observe(this) { message ->
            AlertDialog.Builder(this).apply {
                setTitle("Login Status")
                setMessage(message)
                setPositiveButton("OK") { _, _ ->
                    if (message?.contains("success", true) == true) {
                        finish()
                    }
                }
                create()
                show()
            }
        }

        loginViewModel.isLoading.observe(this) { isLoading ->
            binding.loginButton.isEnabled = !isLoading
        }
    }
}