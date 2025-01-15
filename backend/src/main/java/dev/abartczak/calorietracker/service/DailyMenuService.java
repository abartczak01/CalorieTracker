package dev.abartczak.calorietracker.service;

import dev.abartczak.calorietracker.domain.DailyMenu;
import dev.abartczak.calorietracker.domain.User;
import dev.abartczak.calorietracker.repository.DailyMenuRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class DailyMenuService {

    private DailyMenuRepository dailyMenuRepository;

    public DailyMenu save(DailyMenu dailyMenu) {
        return dailyMenuRepository.save(dailyMenu);
    }

    public Optional<DailyMenu> findById(Long id) {
        return dailyMenuRepository.findById(id);
    }

    public void deleteById(Long id) {
        dailyMenuRepository.deleteById(id);
    }

    public List<DailyMenu> findByUser(User user) {
        return dailyMenuRepository.findByUser(user);
    }

}
